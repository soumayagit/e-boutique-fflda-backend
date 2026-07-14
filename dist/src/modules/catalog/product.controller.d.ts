import { ProductService } from './application/use-cases/product.service';
import { CreateProductDto, UpdateProductDto } from './application/dtos/product.dto';
import { CreateVariantDto } from './application/dtos/create-variant.dto';
import { UpdateVariantDto } from './application/dtos/update-variant.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(categoryId?: string, search?: string): Promise<import("./domain/entities/product.entity").ProductEntity[]>;
    findLatest(limit?: string): Promise<import("./domain/entities/product.entity").ProductEntity[]>;
    findAllAdmin(): Promise<import("./domain/entities/product.entity").ProductEntity[]>;
    findById(id: string): Promise<import("./domain/entities/product.entity").ProductEntity>;
    create(dto: CreateProductDto): Promise<import("./domain/entities/product.entity").ProductEntity>;
    update(id: string, dto: UpdateProductDto): Promise<import("./domain/entities/product.entity").ProductEntity>;
    delete(id: string): Promise<void>;
    getVariants(id: string): Promise<import("./domain/ports/product.repository").ProductVariantEntity[]>;
    addVariant(id: string, dto: CreateVariantDto): Promise<import("./domain/ports/product.repository").ProductVariantEntity>;
    updateVariant(id: string, variantId: string, dto: UpdateVariantDto): Promise<import("./domain/ports/product.repository").ProductVariantEntity>;
    deleteVariant(id: string, variantId: string): Promise<void>;
}
