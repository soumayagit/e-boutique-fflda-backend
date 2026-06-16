import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { CreateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

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
          throw new BadRequestException(`Stock insuffisant pour ${item.product.name}`);
        }
      }
    }

    const subtotal     = cart.items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);
    const shippingCost = 4.90;
    const total        = subtotal + shippingCost;

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
              subtotal:    Number(item.product.price) * item.quantity,
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

    return this.formatOrder(order);
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

  private formatOrder(order: any) {
    return {
      id:            order.id,
      status:        order.status,
      paymentStatus: order.paymentStatus,
      total:         Number(order.total),
      shippingCost:  Number(order.shippingCost),
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
        quantity:    item.quantity,
        subtotal:    Number(item.subtotal),
      })),
      user: order.user ?? null,
    };
  }
}