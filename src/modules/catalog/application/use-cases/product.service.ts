import {
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import type { IProductRepository } from '../../domain/ports/product.repository';
import { PRODUCT_REPOSITORY } from '../../domain/ports/product.repository';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { CreateVariantDto } from '../dtos/create-variant.dto';
import { UpdateVariantDto } from '../dtos/update-variant.dto';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
  ) {}

  // ── Produits ────────────────────────────────────────────────────

  async findAll(categoryId?: string, search?: string): Promise<ProductEntity[]> {
    return this.productRepo.findAll({ categoryId, search });
  }

  async findLatest(limit = 4): Promise<ProductEntity[]> {
  return this.productRepo.findLatest(limit, 30); // comment soumaya 30 jours
  }

  async findAllAdmin(): Promise<ProductEntity[]> {
    return this.productRepo.findAllAdmin();
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('Produit introuvable');
    return product;
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepo.create(dto);
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductEntity> {
    await this.findById(id);
    return this.productRepo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    return this.productRepo.delete(id);
  }

  // ── Variants (tailles) ──────────────────────────────────────────

  async getVariants(productId: string) {
    await this.findById(productId); // vérifie que le produit existe
    return this.productRepo.getVariants(productId);
  }

  async addVariant(productId: string, dto: CreateVariantDto) {
    await this.findById(productId);
    return this.productRepo.addVariant(productId, dto);
  }

  async updateVariant(productId: string, variantId: string, dto: UpdateVariantDto) {
    await this.findById(productId);
    const variant = await this.productRepo.findVariantById(variantId);
    if (!variant) throw new NotFoundException('Taille introuvable');
    return this.productRepo.updateVariant(variantId, dto);
  }

  async deleteVariant(productId: string, variantId: string) {
    await this.findById(productId);
    const variant = await this.productRepo.findVariantById(variantId);
    if (!variant) throw new NotFoundException('Taille introuvable');
    return this.productRepo.deleteVariant(variantId);
  }
}