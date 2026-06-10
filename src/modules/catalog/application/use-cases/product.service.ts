import {
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import type { IProductRepository } from '../../domain/ports/product.repository';
import { PRODUCT_REPOSITORY } from '../../domain/ports/product.repository';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
  ) {}

  async findAll(categoryId?: string, search?: string): Promise<ProductEntity[]> {
    return this.productRepo.findAll({ categoryId, search });
  }

  async findLatest(limit = 4): Promise<ProductEntity[]> {
    return this.productRepo.findLatest(limit);
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
}