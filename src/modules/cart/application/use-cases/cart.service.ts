import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { AddCartItemDto, UpdateCartItemDto } from '../dto/cart.dto';

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateCart(userId: string) {
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
        data:  { expiresAt: new Date(Date.now() + ONE_MONTH) },
      });
      cart.items = [];
    }

    return this.formatCart(cart);
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product || !product.isActive) {
      throw new NotFoundException('Produit introuvable ou inactif');
    }

    if (dto.variantId) {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: dto.variantId },
      });
      if (!variant) throw new NotFoundException('Taille introuvable');
      if (variant.stock < dto.quantity) {
        throw new BadRequestException(
          `Stock insuffisant pour cette taille (${variant.stock} disponibles)`);
      }
    } else {
      if (product.stock < dto.quantity) {
        throw new BadRequestException(
          `Stock insuffisant (${product.stock} disponibles)`);
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
    } else {
      await this.prisma.cart.update({
        where: { id: cart.id },
        data:  { expiresAt: new Date(Date.now() + ONE_MONTH) },
      });
    }

    // ── US338 : tapis → toujours créer un nouvel item (pas de fusion) ──────
    const isTapis = dto.longueur != null || dto.largeur != null ||
                    dto.epaisseur != null || dto.planFileUrl != null;

    if (isTapis) {
      await this.prisma.cartItem.create({
        data: {
          cartId:      cart.id,
          productId:   dto.productId,
          variantId:   dto.variantId,
          quantity:    dto.quantity,
          longueur:    dto.longueur,
          largeur:     dto.largeur,
          epaisseur:   dto.epaisseur,
          planFileUrl: dto.planFileUrl,
        },
      });
    } else {
      // Produit normal → fusion si déjà dans le panier
      const existingItem = await this.prisma.cartItem.findFirst({
        where: {
          cartId:    cart.id,
          productId: dto.productId,
          variantId: dto.variantId ?? null,
        },
      });

      if (existingItem) {
        await this.prisma.cartItem.update({
          where: { id: existingItem.id },
          data:  { quantity: existingItem.quantity + dto.quantity },
        });
      } else {
        await this.prisma.cartItem.create({
          data: {
            cartId:    cart.id,
            productId: dto.productId,
            variantId: dto.variantId,
            quantity:  dto.quantity,
          },
        });
      }
    }

    return this.getOrCreateCart(userId);
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Panier introuvable');

    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });
    if (!item) throw new NotFoundException('Article introuvable dans le panier');

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data:  { quantity: dto.quantity },
    });

    return this.getOrCreateCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Panier introuvable');

    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });
    if (!item) throw new NotFoundException('Article introuvable dans le panier');

    await this.prisma.cartItem.delete({ where: { id: itemId } });

    return this.getOrCreateCart(userId);
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Panier introuvable');

    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return this.getOrCreateCart(userId);
  }

  private formatCart(cart: any) {
    const items = cart.items.map((item: any) => ({
      id:       item.id,
      quantity: item.quantity,
      product: {
        id:       item.product.id,
        name:     item.product.name,
        price:    Number(item.product.price),
        imageUrl: item.product.imageUrl,
        stock:    item.product.stock,
      },
      variant: item.variant
          ? { id: item.variant.id, size: item.variant.size, stock: item.variant.stock }
          : null,
      // ── US338 dimensions tapis ────────────────────────────────
      longueur:    item.longueur    ?? null,
      largeur:     item.largeur     ?? null,
      epaisseur:   item.epaisseur   ?? null,
      planFileUrl: item.planFileUrl ?? null,
      subtotal: Number(item.product.price) * item.quantity,
    }));

    const total = items.reduce((sum: number, i: any) => sum + i.subtotal, 0);

    return {
      id:                cart.id,
      itemCount:         items.reduce((sum: number, i: any) => sum + i.quantity, 0),
      items,
      total:             Math.round(total * 100) / 100,
      shippingCost:      items.length > 0 ? 4.90 : 0,
      totalWithShipping: items.length > 0
          ? Math.round((total + 4.90) * 100) / 100
          : 0,
    };
  }
}