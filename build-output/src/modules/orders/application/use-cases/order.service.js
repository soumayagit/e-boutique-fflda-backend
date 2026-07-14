"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../../prisma/prisma.service");
const mail_service_1 = require("../../../mail/mail.service");
const client_1 = require("@prisma/client");
let OrderService = class OrderService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    TVA_RATE = 0.20;
    SHIPPING_HT = 4.08;
    async createOrder(userId, dto) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true, variant: true },
                },
            },
        });
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Le panier est vide');
        }
        for (const item of cart.items) {
            if (item.variantId && item.variant) {
                if (item.variant.stock < item.quantity) {
                    throw new common_1.BadRequestException(`Stock insuffisant pour ${item.product.name} (taille ${item.variant.size})`);
                }
            }
            else {
                if (item.product.stock < item.quantity) {
                    throw new common_1.BadRequestException(`Stock insuffisant pour ${item.product.name}`);
                }
            }
        }
        const subtotal = cart.items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);
        const shippingTVA = Math.round(this.SHIPPING_HT * this.TVA_RATE * 100) / 100;
        const shippingCost = Math.round((this.SHIPPING_HT + shippingTVA) * 100) / 100;
        const total = Math.round((subtotal + shippingCost) * 100) / 100;
        const paymentMethod = (dto.paymentMethod ?? 'card');
        const paymentStatus = this._getPaymentStatus(dto.paymentMethod ?? 'card');
        const requiresValidation = cart.items.some((item) => item.longueur != null ||
            item.largeur != null ||
            item.epaisseur != null ||
            item.planFileUrl != null);
        const initialStatus = requiresValidation ? 'AWAITING_ADMIN_REVIEW' : 'PENDING';
        const order = await this.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    status: initialStatus,
                    requiresValidation,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    address: dto.address,
                    city: dto.city,
                    postalCode: dto.postalCode,
                    phone: dto.phone,
                    notes: dto.notes,
                    paymentMethod,
                    paymentStatus,
                    total,
                    shippingCost,
                    items: {
                        create: cart.items.map((item) => ({
                            productId: item.productId,
                            variantId: item.variantId,
                            productName: item.product.name,
                            size: item.variant?.size ?? null,
                            price: Number(item.product.price),
                            quantity: item.quantity,
                            subtotal: Math.round(Number(item.product.price) * item.quantity * 100) / 100,
                            longueur: item.longueur,
                            largeur: item.largeur,
                            epaisseur: item.epaisseur,
                            planFileUrl: item.planFileUrl,
                        })),
                    },
                },
                include: { items: true },
            });
            for (const item of cart.items) {
                if (item.variantId) {
                    await tx.productVariant.update({
                        where: { id: item.variantId },
                        data: { stock: { decrement: item.quantity } },
                    });
                }
                else {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: { stock: { decrement: item.quantity } },
                    });
                }
            }
            await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
            return newOrder;
        });
        const formatted = this.formatOrder(order);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { email: true },
        });
        if (user?.email && paymentMethod === 'cod' && !requiresValidation) {
            try {
                await this.mailService.sendOrderConfirmation(user.email, dto.firstName ?? 'Client', order.id, formatted.items.map((i) => ({
                    name: i.productName,
                    quantity: i.quantity,
                    price: i.price,
                })), formatted.total);
            }
            catch (mailError) {
                console.warn('Email client non envoyé:', mailError.message);
            }
        }
        else if (requiresValidation) {
            console.log(`ℹ️ Commande ${order.id} en attente de validation admin`);
        }
        try {
            await this._notifyAdminsNewOrder(order.id, formatted, requiresValidation);
        }
        catch (mailError) {
            console.warn('Email admin non envoyé:', mailError.message);
        }
        return formatted;
    }
    async _notifyAdminsNewOrder(orderId, formatted, requiresValidation) {
        const admins = await this.prisma.user.findMany({
            where: {
                role: { in: ['ADMIN', 'SUPER_ADMIN', 'MANAGER'] },
                isActive: true,
            },
            select: { email: true, firstName: true },
        });
        if (admins.length === 0) {
            console.warn('⚠️ Aucun admin actif trouvé en base — aucun email de notification envoyé');
            return;
        }
        for (const admin of admins) {
            try {
                await this.mailService.sendAdminNewOrder(admin.email, admin.firstName ?? 'Admin', orderId, formatted.total, requiresValidation);
                console.log(`✅ Email admin envoyé à ${admin.email}`);
            }
            catch (err) {
                console.warn(`⚠️ Email admin non envoyé à ${admin.email}:`, err.message);
            }
        }
    }
    _getPaymentStatus(paymentMethod) {
        switch (paymentMethod) {
            case 'cod': return client_1.PaymentStatus.PENDING;
            case 'paypal': return client_1.PaymentStatus.SIMULATED;
            case 'card': return client_1.PaymentStatus.SIMULATED;
            default: return client_1.PaymentStatus.SIMULATED;
        }
    }
    async getUserOrders(userId) {
        const orders = await this.prisma.order.findMany({
            where: { userId },
            include: { items: true },
            orderBy: { createdAt: 'desc' },
        });
        return orders.map((o) => this.formatOrder(o));
    }
    async confirmPaymentAndNotify(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true, user: true },
        });
        if (!order) {
            console.warn(`⚠️ Commande ${orderId} introuvable pour confirmation paiement`);
            return;
        }
        if (order.requiresValidation && order.status !== 'AWAITING_PAYMENT') {
            throw new common_1.BadRequestException('Cette commande sur-mesure doit être validée par un administrateur avant paiement');
        }
        const updatedOrder = await this.prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: 'PAID', status: 'CONFIRMED' },
            include: { items: true, user: true },
        });
        const email = updatedOrder.user?.email;
        const firstName = updatedOrder.firstName ?? 'Client';
        if (email) {
            try {
                const formatted = this.formatOrder(updatedOrder);
                await this.mailService.sendOrderConfirmation(email, firstName, updatedOrder.id, formatted.items.map((i) => ({
                    name: i.productName,
                    quantity: i.quantity,
                    price: i.price,
                })), formatted.total);
                console.log(`✅ Email confirmation paiement envoyé à ${email}`);
            }
            catch (mailError) {
                console.warn('⚠️ Email confirmation paiement non envoyé:', mailError.message);
            }
        }
        return this.formatOrder(updatedOrder);
    }
    async getOrderById(userId, orderId) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, userId },
            include: { items: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Commande introuvable');
        return this.formatOrder(order);
    }
    async getAllOrders() {
        const orders = await this.prisma.order.findMany({
            include: {
                items: true,
                user: { select: { firstName: true, lastName: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return orders.map((o) => this.formatOrder(o));
    }
    async updateStatus(orderId, status) {
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: { status: status },
            include: { items: true, user: true },
        });
        const email = order.user?.email;
        const firstName = order.firstName ?? 'Client';
        if (email) {
            try {
                switch (status) {
                    case 'CONFIRMED':
                        await this.mailService.sendOrderStatusConfirmed(email, firstName, order.id);
                        break;
                    case 'SHIPPED':
                        await this.mailService.sendOrderShipped(email, firstName, order.id);
                        break;
                    case 'DELIVERED':
                        await this.mailService.sendOrderDelivered(email, firstName, order.id);
                        break;
                    case 'CANCELLED':
                        await this.mailService.sendOrderCancelled(email, firstName, order.id);
                        break;
                }
                console.log(`✅ Email statut ${status} envoyé à ${email}`);
            }
            catch (mailError) {
                console.warn('⚠️ Email non envoyé:', mailError.message);
            }
        }
        return this.formatOrder(order);
    }
    async validateOrder(orderId, adminUserId, finalTotal) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Commande introuvable');
        if (!order.requiresValidation) {
            throw new common_1.BadRequestException('Cette commande ne nécessite pas de validation');
        }
        if (order.status !== 'AWAITING_ADMIN_REVIEW') {
            throw new common_1.BadRequestException('Cette commande a déjà été traitée');
        }
        const updated = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: 'AWAITING_PAYMENT',
                validatedAt: new Date(),
                validatedBy: adminUserId,
                ...(finalTotal != null ? { total: finalTotal } : {}),
            },
            include: { items: true, user: true },
        });
        const email = updated.user?.email;
        if (email) {
            try {
                console.log(`✅ Commande ${orderId} validée, en attente de paiement`);
            }
            catch (mailError) {
                console.warn('⚠️ Email non envoyé:', mailError.message);
            }
        }
        return this.formatOrder(updated);
    }
    async updatePaymentStatus(orderId, paymentStatus) {
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: paymentStatus },
            include: { items: true },
        });
        return this.formatOrder(order);
    }
    async deleteOrder(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order)
            throw new common_1.NotFoundException('Commande introuvable');
        await this.prisma.order.delete({ where: { id: orderId } });
    }
    formatOrder(order) {
        const tva = this.TVA_RATE;
        const total = Number(order.total);
        const shipping = Number(order.shippingCost);
        const subtotal = Math.round((total - shipping) * 100) / 100;
        const subtotalHT = Math.round((subtotal / (1 + tva)) * 100) / 100;
        const subtotalTVA = Math.round((subtotal - subtotalHT) * 100) / 100;
        const shippingHT = Math.round((shipping / (1 + tva)) * 100) / 100;
        const shippingTVA = Math.round((shipping - shippingHT) * 100) / 100;
        const totalHT = Math.round((subtotalHT + shippingHT) * 100) / 100;
        const totalTVA = Math.round((subtotalTVA + shippingTVA) * 100) / 100;
        return {
            id: order.id,
            status: order.status,
            paymentMethod: order.paymentMethod ?? 'card',
            paymentStatus: order.paymentStatus ?? 'SIMULATED',
            total,
            subtotal,
            shippingCost: shipping,
            totalHT,
            subtotalHT,
            shippingHT,
            totalTVA,
            subtotalTVA,
            shippingTVA,
            tvaRate: tva * 100,
            address: {
                firstName: order.firstName,
                lastName: order.lastName,
                address: order.address,
                city: order.city,
                postalCode: order.postalCode,
                phone: order.phone,
            },
            notes: order.notes,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
                id: item.id,
                productName: item.productName,
                size: item.size,
                price: Number(item.price),
                priceHT: Math.round((Number(item.price) / (1 + tva)) * 100) / 100,
                quantity: item.quantity,
                subtotal: Number(item.subtotal),
                subtotalHT: Math.round((Number(item.subtotal) / (1 + tva)) * 100) / 100,
                tva: Math.round((Number(item.subtotal) - (Number(item.subtotal) / (1 + tva))) * 100) / 100,
            })),
            user: order.user ?? null,
        };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], OrderService);
//# sourceMappingURL=order.service.js.map