import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewOutput, ReviewStats } from '../domain/review.interface';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  // Récupère tous les avis d'un produit, plus récents en premier
  async findByProduct(productId: string): Promise<ReviewOutput[]> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Produit introuvable');
    }

    const reviews = await this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    return reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      date: review.createdAt,
      userName: `${review.user.firstName} ${review.user.lastName}`.trim(),
    }));
  }

  // Crée un nouvel avis pour un produit
  async create(
    productId: string,
    userId: string,
    dto: CreateReviewDto,
  ): Promise<ReviewOutput> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Produit introuvable');
    }

    const review = await this.prisma.review.create({
      data: {
        productId,
        userId,
        rating: dto.rating,
        comment: dto.comment ?? '',
      },
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    return {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      date: review.createdAt,
      userName: `${review.user.firstName} ${review.user.lastName}`.trim(),
    };
  }

  // Calcule la moyenne et le nombre d'avis pour un produit
  async getStats(productId: string): Promise<ReviewStats> {
    const result = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { id: true },
    });

    return {
      averageRating: result._avg.rating ?? 0,
      reviewCount: result._count.id ?? 0,
    };
  }
}