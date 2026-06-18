import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { CreateOrderDto } from '../dto/order.dto';
import { MailService } from '../../../mail/mail.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  private readonly TVA_RATE     = 0.20;
  private readonly SHIPPING_HT  = 4.08;

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

    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          firstName:   dto.firstName,
          lastName:    dto.lastName,
          address:     dto.address,
          city:        dto.city,
          postalCode:  dto.postalCode,
          phone:       dto.phone,
          notes:       dto.notes,
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
      where: { id: userId },
      select: { email: true },
    });

    if (user?.email) {
      await this.mailService.sendOrderConfirmation(
        user.email,
        dto.firstName,
        order.id,
        formatted.items.map(i => ({
          name:     i.productName,
          quantity: i.quantity,
          price:    i.price,
        })),
        formatted.total,
      );
    }

    return formatted;
  }

  async getUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where:   { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map((o) => this.formatOrder(o));
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
    const tva         = this.TVA_RATE;
    const total       = Number(order.total);
    const shipping    = Number(order.shippingCost);
    const subtotal    = Math.round((total - shipping) * 100) / 100;

    const subtotalHT  = Math.round((subtotal / (1 + tva)) * 100) / 100;
    const subtotalTVA = Math.round((subtotal - subtotalHT) * 100) / 100;
    const shippingHT  = Math.round((shipping / (1 + tva)) * 100) / 100;
    const shippingTVA = Math.round((shipping - shippingHT) * 100) / 100;
    const totalHT     = Math.round((subtotalHT + shippingHT) * 100) / 100;
    const totalTVA    = Math.round((subtotalTVA + shippingTVA) * 100) / 100;

    return {
      id:            order.id,
      status:        order.status,
      paymentStatus: order.paymentStatus,
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