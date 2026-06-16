import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type {
  IProductRepository,
  CreateProductInput,
  UpdateProductInput,
  ProductFilters,
  CreateVariantInput,
  UpdateVariantInput,
  ProductVariantEntity,
} from '../../domain/ports/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ── Produits ─────────────────────────────────────────────────────────────────

  async findAll(filters?: ProductFilters): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany({
      where: {
        isActive: true,
        ...(filters?.categoryId && { categoryId: filters.categoryId }),
        ...(filters?.search && {
          name: { contains: filters.search, mode: 'insensitive' },
        }),
      },
      orderBy: filters?.orderBy === 'price'
        ? { price: 'asc' }
        : filters?.orderBy === 'name'
        ? { name: 'asc' }
        : { createdAt: 'desc' },
      take: filters?.limit,
      include: {
        category: true,
        variants: { orderBy: { size: 'asc' } },
      },
    });
    return products.map(p => this.toEntity(p));
  }

  async findLatest(limit: number, daysOld = 30): Promise<ProductEntity[]> {
  const dateFilter = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);

  let products = await this.prisma.product.findMany({
    where: {
      isActive:  true,
      createdAt: { gte: dateFilter },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      category: true,
      variants: { orderBy: { size: 'asc' } },
    },
  });

  // Fallback : si aucun produit du mois → prend les N plus récents
  if (products.length === 0) {
    products = await this.prisma.product.findMany({
      where:   { isActive: true },
      orderBy: { createdAt: 'desc' },
      take:    limit,
      include: {
        category: true,
        variants: { orderBy: { size: 'asc' } },
      },
    });
  }

  return products.map(p => this.toEntity(p));
}

  async findAllAdmin(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        variants: { orderBy: { size: 'asc' } },
        reviews:  { select: { rating: true } },
      },
    });
    return products.map(p => this.toEntity(p));
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: { orderBy: { size: 'asc' } },
      },
    });
    return product ? this.toEntity(product) : null;
  }

  async create(input: CreateProductInput): Promise<ProductEntity> {
    const product = await this.prisma.product.create({
      data: {
        name:        input.name,
        description: input.description,
        price:       input.price,
        stock:       input.stock,
        imageUrl:    input.imageUrl,
        categoryId:  input.categoryId,
      },
      include: {
        category: true,
        variants: true,
      },
    });
    return this.toEntity(product);
  }

  async update(id: string, input: UpdateProductInput): Promise<ProductEntity> {
    const product = await this.prisma.product.update({
      where: { id },
      data: input,
      include: {
        category: true,
        variants: { orderBy: { size: 'asc' } },
      },
    });
    return this.toEntity(product);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  // ── Variants (tailles) ────────────────────────────────────────────────────────

  async getVariants(productId: string): Promise<ProductVariantEntity[]> {
    return this.prisma.productVariant.findMany({
      where: { productId },
      orderBy: { size: 'asc' },
    });
  }

  async findVariantById(variantId: string): Promise<ProductVariantEntity | null> {
    return this.prisma.productVariant.findUnique({
      where: { id: variantId },
    });
  }

  async addVariant(productId: string, input: CreateVariantInput): Promise<ProductVariantEntity> {
    return this.prisma.productVariant.create({
      data: {
        productId,
        size:  input.size,
        stock: input.stock,
      },
    });
  }

  async updateVariant(variantId: string, input: UpdateVariantInput): Promise<ProductVariantEntity> {
    return this.prisma.productVariant.update({
      where: { id: variantId },
      data:  { stock: input.stock },
    });
  }

  async deleteVariant(variantId: string): Promise<void> {
    await this.prisma.productVariant.delete({ where: { id: variantId } });
  }

  // ── Mapper ────────────────────────────────────────────────────────────────────

  private toEntity(raw: any): ProductEntity {
    const e       = new ProductEntity();
    e.id          = raw.id;
    e.name        = raw.name;
    e.description = raw.description;
    e.price       = Number(raw.price);
    e.stock       = raw.stock;
    e.imageUrl    = raw.imageUrl;
    e.isActive    = raw.isActive;
    e.categoryId  = raw.categoryId;
    e.createdAt   = raw.createdAt;
    e.updatedAt   = raw.updatedAt;
    e.variants    = raw.variants ?? [];
    return e;
  }
}