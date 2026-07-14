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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../../prisma/prisma.service");
const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateCart(userId) {
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true, name: true, price: true,
                                imageUrl: true, stock: true, isActive: true,
                            },
                        },
                        variant: {
                            select: { id: true, size: true, stock: true },
                        },
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: {
                    userId,
                    expiresAt: new Date(Date.now() + ONE_MONTH),
                },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true, name: true, price: true,
                                    imageUrl: true, stock: true, isActive: true,
                                },
                            },
                            variant: {
                                select: { id: true, size: true, stock: true },
                            },
                        },
                    },
                },
            });
        }
        if (cart.expiresAt < new Date()) {
            await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
            await this.prisma.cart.update({
                where: { id: cart.id },
                data: { expiresAt: new Date(Date.now() + ONE_MONTH) },
            });
            cart.items = [];
        }
        return this.formatCart(cart);
    }
    async addItem(userId, dto) {
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });
        if (!product || !product.isActive) {
            throw new common_1.NotFoundException('Produit introuvable ou inactif');
        }
        if (dto.variantId) {
            const variant = await this.prisma.productVariant.findUnique({
                where: { id: dto.variantId },
            });
            if (!variant)
                throw new common_1.NotFoundException('Taille introuvable');
            if (variant.stock < dto.quantity) {
                throw new common_1.BadRequestException(`Stock insuffisant pour cette taille (${variant.stock} disponibles)`);
            }
        }
        else {
            if (product.stock < dto.quantity) {
                throw new common_1.BadRequestException(`Stock insuffisant (${product.stock} disponibles)`);
            }
        }
        let cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: {
                    userId,
                    expiresAt: new Date(Date.now() + ONE_MONTH),
                },
            });
        }
        else {
            await this.prisma.cart.update({
                where: { id: cart.id },
                data: { expiresAt: new Date(Date.now() + ONE_MONTH) },
            });
        }
        const isTapis = dto.longueur != null || dto.largeur != null ||
            dto.epaisseur != null || dto.planFileUrl != null;
        if (isTapis) {
            await this.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: dto.productId,
                    variantId: dto.variantId,
                    quantity: dto.quantity,
                    longueur: dto.longueur,
                    largeur: dto.largeur,
                    epaisseur: dto.epaisseur,
                    planFileUrl: dto.planFileUrl,
                },
            });
        }
        else {
            const existingItem = await this.prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: dto.productId,
                    variantId: dto.variantId ?? null,
                },
            });
            if (existingItem) {
                await this.prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + dto.quantity },
                });
            }
            else {
                await this.prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: dto.productId,
                        variantId: dto.variantId,
                        quantity: dto.quantity,
                    },
                });
            }
        }
        return this.getOrCreateCart(userId);
    }
    async updateItem(userId, itemId, dto) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new common_1.NotFoundException('Panier introuvable');
        const item = await this.prisma.cartItem.findFirst({
            where: { id: itemId, cartId: cart.id },
        });
        if (!item)
            throw new common_1.NotFoundException('Article introuvable dans le panier');
        await this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity: dto.quantity },
        });
        return this.getOrCreateCart(userId);
    }
    async removeItem(userId, itemId) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new common_1.NotFoundException('Panier introuvable');
        const item = await this.prisma.cartItem.findFirst({
            where: { id: itemId, cartId: cart.id },
        });
        if (!item)
            throw new common_1.NotFoundException('Article introuvable dans le panier');
        await this.prisma.cartItem.delete({ where: { id: itemId } });
        return this.getOrCreateCart(userId);
    }
    async clearCart(userId) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new common_1.NotFoundException('Panier introuvable');
        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        return this.getOrCreateCart(userId);
    }
    formatCart(cart) {
        const items = cart.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            product: {
                id: item.product.id,
                name: item.product.name,
                price: Number(item.product.price),
                imageUrl: item.product.imageUrl,
                stock: item.product.stock,
            },
            variant: item.variant
                ? { id: item.variant.id, size: item.variant.size, stock: item.variant.stock }
                : null,
            longueur: item.longueur ?? null,
            largeur: item.largeur ?? null,
            epaisseur: item.epaisseur ?? null,
            planFileUrl: item.planFileUrl ?? null,
            subtotal: Number(item.product.price) * item.quantity,
        }));
        const total = items.reduce((sum, i) => sum + i.subtotal, 0);
        return {
            id: cart.id,
            itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
            items,
            total: Math.round(total * 100) / 100,
            shippingCost: items.length > 0 ? 4.90 : 0,
            totalWithShipping: items.length > 0
                ? Math.round((total + 4.90) * 100) / 100
                : 0,
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map