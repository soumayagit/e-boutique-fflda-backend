import type { IProductRepository } from '../../domain/ports/product.repository';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { CreateVariantDto } from '../dtos/create-variant.dto';
import { UpdateVariantDto } from '../dtos/update-variant.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
export declare class ProductService {
    private readonly productRepo;
    constructor(productRepo: IProductRepository);
    findAll(categoryId?: string, search?: string): Promise<ProductEntity[]>;
    findLatest(limit?: number): Promise<ProductEntity[]>;
    findAllAdmin(): Promise<ProductEntity[]>;
    findById(id: string): Promise<ProductEntity>;
    create(dto: CreateProductDto): Promise<ProductEntity>;
    update(id: string, dto: UpdateProductDto): Promise<ProductEntity>;
    delete(id: string): Promise<void>;
    getVariants(productId: string): Promise<import("../../domain/ports/product.repository").ProductVariantEntity[]>;
    addVariant(productId: string, dto: CreateVariantDto): Promise<import("../../domain/ports/product.repository").ProductVariantEntity>;
    updateVariant(productId: string, variantId: string, dto: UpdateVariantDto): Promise<import("../../domain/ports/product.repository").ProductVariantEntity>;
    deleteVariant(productId: string, variantId: string): Promise<void>;
}
