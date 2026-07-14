import { PrismaService } from '../../../../prisma/prisma.service';
import type { IProductRepository, CreateProductInput, UpdateProductInput, ProductFilters, CreateVariantInput, UpdateVariantInput, ProductVariantEntity } from '../../domain/ports/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
export declare class PrismaProductRepository implements IProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: ProductFilters): Promise<ProductEntity[]>;
    findLatest(limit: number, daysOld?: number): Promise<ProductEntity[]>;
    findAllAdmin(): Promise<ProductEntity[]>;
    findById(id: string): Promise<ProductEntity | null>;
    create(input: CreateProductInput): Promise<ProductEntity>;
    update(id: string, input: UpdateProductInput): Promise<ProductEntity>;
    delete(id: string): Promise<void>;
    getVariants(productId: string): Promise<ProductVariantEntity[]>;
    findVariantById(variantId: string): Promise<ProductVariantEntity | null>;
    addVariant(productId: string, input: CreateVariantInput): Promise<ProductVariantEntity>;
    updateVariant(variantId: string, input: UpdateVariantInput): Promise<ProductVariantEntity>;
    deleteVariant(variantId: string): Promise<void>;
    private toEntity;
}
