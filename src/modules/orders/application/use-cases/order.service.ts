import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { CreateOrderDto } from '../dto/order.dto';
import { MailService } from '../../../mail/mail.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';
@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  private readonly TVA_RATE    = 0.20;
  private readonly SHIPPING_HT = 4.08;

async createOrder(userId: string, dto: CreateOrderDto) {
  const cart = await this.prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true, variant: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new BadRequestException('Le panier est vide');
  }

  for (const item of cart.items) {
    if (item.variantId && item.variant) {
      if (item.variant.stock < item.quantity) {
        throw new BadRequestException(
          `Stock insuffisant pour ${item.product.name} (taille ${item.variant.size})`,
        );
      }
    } else {
      if (item.product.stock < item.quantity) {
        throw new BadRequestException(
          `Stock insuffisant pour ${item.product.name}`,
        );
      }
    }
  }

  const subtotal     = cart.items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity, 0,
  );
  const shippingTVA  = Math.round(this.SHIPPING_HT * this.TVA_RATE * 100) / 100;
  const shippingCost = Math.round((this.SHIPPING_HT + shippingTVA) * 100) / 100;
  const total        = Math.round((subtotal + shippingCost) * 100) / 100;

  const paymentMethod = (dto.paymentMethod ?? 'card') as PaymentMethod;
  const paymentStatus = this._getPaymentStatus(dto.paymentMethod ?? 'card');

  // ── Détection commande sur-mesure (tapis) ──────────────────────
  const requiresValidation = cart.items.some(
    (item) =>
      item.longueur != null ||
      item.largeur != null ||
      item.epaisseur != null ||
      item.planFileUrl != null,
  );
  const initialStatus = requiresValidation ? 'AWAITING_ADMIN_REVIEW' : 'PENDING';

  const order = await this.prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId,
        status:        initialStatus as any,
        requiresValidation,
        firstName:     dto.firstName,
        lastName:      dto.lastName,
        address:       dto.address,
        city:          dto.city,
        postalCode:    dto.postalCode,
        phone:         dto.phone,
        notes:         dto.notes,
        paymentMethod,
        paymentStatus,
        total,
        shippingCost,
        items: {
          create: cart.items.map((item) => ({
            productId:   item.productId,
            variantId:   item.variantId,
            productName: item.product.name,
            size:        item.variant?.size ?? null,
            price:       Number(item.product.price),
            quantity:    item.quantity,
            subtotal:    Math.round(Number(item.product.price) * item.quantity * 100) / 100,
            // ── report des infos tapis vers OrderItem ──
            longueur:    item.longueur,
            largeur:     item.largeur,
            epaisseur:   item.epaisseur,
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
          data:  { stock: { decrement: item.quantity } },
        });
      } else {
        await tx.product.update({
          where: { id: item.productId },
          data:  { stock: { decrement: item.quantity } },
        });
      }
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    return newOrder;
  });

  const formatted = this.formatOrder(order);

  const user = await this.prisma.user.findUnique({
    where:  { id: userId },
    select: { email: true },
  });

  // ── Notification au client (comportement existant, inchangé) ──
  if (user?.email && paymentMethod === 'cod' && !requiresValidation) {
    try {
      await this.mailService.sendOrderConfirmation(
        user.email,
        dto.firstName ?? 'Client',
        order.id,
        formatted.items.map((i) => ({
          name:     i.productName,
          quantity: i.quantity,
          price:    i.price,
        })),
        formatted.total,
      );
    } catch (mailError) {
      console.warn('Email client non envoyé:', mailError.message);
    }
  } else if (requiresValidation) {
    console.log(`ℹ️ Commande ${order.id} en attente de validation admin`);
  }

  // ── Notification aux admins : TOUTE commande, sur-mesure ou non ──
  try {
    await this._notifyAdminsNewOrder(order.id, formatted, requiresValidation);
  } catch (mailError) {
    console.warn('Email admin non envoyé:', mailError.message);
  }

  return formatted;
}

  // ── Notifie tous les admins qu'une nouvelle commande a été passée ──
  private async _notifyAdminsNewOrder(
    orderId: string,
    formatted: any,
    requiresValidation: boolean,
  ) {
    const admins = await this.prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'SUPER_ADMIN', 'MANAGER'] },
        isActive: true,
      },
      select: { email: true, firstName: true },
    });

    if (admins.length === 0) {
      console.warn(
        '⚠️ Aucun admin actif trouvé en base — aucun email de notification envoyé',
      );
      return;
    }

    for (const admin of admins) {
      try {
        await this.mailService.sendAdminNewOrder(
          admin.email,
          admin.firstName ?? 'Admin',
          orderId,
          formatted.total,
          requiresValidation,
        );
        console.log(`✅ Email admin envoyé à ${admin.email}`);
      } catch (err) {
        console.warn(`⚠️ Email admin non envoyé à ${admin.email}:`, err.message);
      }
    }
  }

  // ── Détermine le statut selon la méthode de paiement ──
  private _getPaymentStatus(paymentMethod: string): PaymentStatus {
  switch (paymentMethod) {
    case 'cod':    return PaymentStatus.PENDING;
    case 'paypal': return PaymentStatus.SIMULATED;
    case 'card':   return PaymentStatus.SIMULATED;
    default:       return PaymentStatus.SIMULATED;
  }
}

  async getUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where:   { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map((o) => this.formatOrder(o));
  }
  // ── Confirme le paiement et envoie l'email (Stripe/PayPal) ──
async confirmPaymentAndNotify(orderId: string) {
  const order = await this.prisma.order.findUnique({
    where:   { id: orderId },
    include: { items: true, user: true },
  });

  if (!order) {
    console.warn(`⚠️ Commande ${orderId} introuvable pour confirmation paiement`);
    return;
  }

  // ── Garde-fou : refuse le paiement tant que l'admin n'a pas validé ──
  if (order.requiresValidation && order.status !== 'AWAITING_PAYMENT') {
    throw new BadRequestException(
      'Cette commande sur-mesure doit être validée par un administrateur avant paiement',
    );
  }

  await this.prisma.order.update({
    where: { id: orderId },
    data:  { paymentStatus: 'PAID' as any },
  });

  // ... reste de la méthode inchangé
}
  async getOrderById(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where:   { id: orderId, userId },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Commande introuvable');
    return this.formatOrder(order);
  }

  async getAllOrders() {
    const orders = await this.prisma.order.findMany({
      include: {
        items: true,
        user:  { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map((o) => this.formatOrder(o));
  }

async updateStatus(orderId: string, status: string) {
  const order = await this.prisma.order.update({
    where:   { id: orderId },
    data:    { status: status as any },
    include: { items: true, user: true },
  });

  // ── Envoie email selon statut ──
  const email     = (order as any).user?.email;
  const firstName = order.firstName ?? 'Client';

  if (email) {
    try {
      switch (status) {
        case 'CONFIRMED':
          await this.mailService.sendOrderStatusConfirmed(
            email, firstName, order.id
          );
          break;
        case 'SHIPPED':
          await this.mailService.sendOrderShipped(
            email, firstName, order.id
          );
          break;
        case 'DELIVERED':
          await this.mailService.sendOrderDelivered(
            email, firstName, order.id
          );
          break;
        case 'CANCELLED':
          await this.mailService.sendOrderCancelled(
            email, firstName, order.id
          );
          break;
      }
      console.log(`✅ Email statut ${status} envoyé à ${email}`);
    } catch (mailError) {
      console.warn('⚠️ Email non envoyé:', mailError.message);
    }
  }

  return this.formatOrder(order);
}
// ── Admin : valide/chiffre une commande sur-mesure ──
async validateOrder(orderId: string, adminUserId: string, finalTotal?: number) {
  const order = await this.prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new NotFoundException('Commande introuvable');

  if (!order.requiresValidation) {
    throw new BadRequestException('Cette commande ne nécessite pas de validation');
  }
  if (order.status !== 'AWAITING_ADMIN_REVIEW') {
    throw new BadRequestException('Cette commande a déjà été traitée');
  }

  const updated = await this.prisma.order.update({
    where: { id: orderId },
    data: {
      status:      'AWAITING_PAYMENT' as any,
      validatedAt: new Date(),
      validatedBy: adminUserId,
      ...(finalTotal != null ? { total: finalTotal } : {}),
    },
    include: { items: true, user: true },
  });

  const email = (updated as any).user?.email;
  if (email) {
    try {
      // TODO: créer sendOrderValidated dans MailService — email avec lien
      // vers /payment pour cette commande précise, prix final inclus
      console.log(`✅ Commande ${orderId} validée, en attente de paiement`);
    } catch (mailError) {
      console.warn('⚠️ Email non envoyé:', mailError.message);
    }
  }

  return this.formatOrder(updated);
}
  // ── Nouveau : mettre à jour le statut de paiement ──
  async updatePaymentStatus(orderId: string, paymentStatus: string) {
    const order = await this.prisma.order.update({
      where:   { id: orderId },
      data:    { paymentStatus: paymentStatus as any },
      include: { items: true },
    });
    return this.formatOrder(order);
  }

  async deleteOrder(orderId: string): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Commande introuvable');
    await this.prisma.order.delete({ where: { id: orderId } });
  }

  private formatOrder(order: any) {
    const tva      = this.TVA_RATE;
    const total    = Number(order.total);
    const shipping = Number(order.shippingCost);
    const subtotal = Math.round((total - shipping) * 100) / 100;

    const subtotalHT  = Math.round((subtotal / (1 + tva)) * 100) / 100;
    const subtotalTVA = Math.round((subtotal - subtotalHT) * 100) / 100;
    const shippingHT  = Math.round((shipping / (1 + tva)) * 100) / 100;
    const shippingTVA = Math.round((shipping - shippingHT) * 100) / 100;
    const totalHT     = Math.round((subtotalHT + shippingHT) * 100) / 100;
    const totalTVA    = Math.round((subtotalTVA + shippingTVA) * 100) / 100;

    return {
      id:            order.id,
      status:        order.status,
      paymentMethod: order.paymentMethod ?? 'card',
      paymentStatus: order.paymentStatus ?? 'SIMULATED',
      total,
      subtotal,
      shippingCost:  shipping,
      totalHT,
      subtotalHT,
      shippingHT,
      totalTVA,
      subtotalTVA,
      shippingTVA,
      tvaRate:       tva * 100,
      address: {
        firstName:  order.firstName,
        lastName:   order.lastName,
        address:    order.address,
        city:       order.city,
        postalCode: order.postalCode,
        phone:      order.phone,
      },
      notes:     order.notes,
      createdAt: order.createdAt,
      items:     order.items.map((item: any) => ({
        id:          item.id,
        productName: item.productName,
        size:        item.size,
        price:       Number(item.price),
        priceHT:     Math.round((Number(item.price) / (1 + tva)) * 100) / 100,
        quantity:    item.quantity,
        subtotal:    Number(item.subtotal),
        subtotalHT:  Math.round((Number(item.subtotal) / (1 + tva)) * 100) / 100,
        tva:         Math.round((Number(item.subtotal) - (Number(item.subtotal) / (1 + tva))) * 100) / 100,
      })),
      user: order.user ?? null,
    };
  }
}