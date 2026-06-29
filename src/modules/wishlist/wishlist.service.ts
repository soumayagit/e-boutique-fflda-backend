import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async getWishlist(userId: string) {
    const items = await this.prisma.wishlistItem.findMany({
      where:   { userId },
      include: {
        product: {
          include: { category: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => ({
      id:        item.id,
      createdAt: item.createdAt,
      product: {
        id:          item.product.id,
        name:        item.product.name,
        description: item.product.description,
        price:       Number(item.product.price),
        imageUrl:    item.product.imageUrl,
        stock:       item.product.stock,
        category:    item.product.category.name,
      },
    }));
  }

  async addToWishlist(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Produit introuvable');

    const existing = await this.prisma.wishlistItem.findFirst({
      where: { userId, productId },
    });

    if (existing) return { message: 'Déjà dans les favoris' };

    await this.prisma.wishlistItem.create({
      data: { userId, productId },
    });

    return { message: 'Ajouté aux favoris' };
  }

  async removeFromWishlist(userId: string, productId: string) {
    const item = await this.prisma.wishlistItem.findFirst({
      where: { userId, productId },
    });
    if (!item) throw new NotFoundException('Favori introuvable');

    await this.prisma.wishlistItem.delete({ where: { id: item.id } });
    return { message: 'Retiré des favoris' };
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const item = await this.prisma.wishlistItem.findFirst({
      where: { userId, productId },
    });
    return !!item;
  }
}