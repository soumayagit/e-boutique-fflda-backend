import { ProductEntity } from '../entities/product.entity';

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  isActive?: boolean;
  categoryId?: string;
}

export interface ProductFilters {
  categoryId?: string;
  search?: string;
  limit?: number;
  orderBy?: 'createdAt' | 'price' | 'name';
}

export interface IProductRepository {
  findAll(filters?: ProductFilters): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
  findLatest(limit: number): Promise<ProductEntity[]>;
  create(input: CreateProductInput): Promise<ProductEntity>;
  update(id: string, input: UpdateProductInput): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
}

export const PRODUCT_REPOSITORY = Symbol('IProductRepository');