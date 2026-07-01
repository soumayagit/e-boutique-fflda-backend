import { ProductEntity } from '../entities/product.entity';

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: string;
   largeur?:     number | null; 
  longueur?:    number | null; 
  epaisseur?:   number | null;
}

export interface UpdateProductInput {
  name?:        string;
  description?: string;
  price?:       number;
  stock?:       number;
  imageUrl?:    string;
  isActive?:    boolean;
  categoryId?:  string;
  largeur?:     number | null; 
  longueur?:    number | null; 
  epaisseur?:   number | null; 
}

export interface ProductFilters {
  categoryId?: string;
  search?: string;
  limit?: number;
  orderBy?: 'createdAt' | 'price' | 'name';
}

export interface CreateVariantInput {
  size: string;
  stock: number;
}

export interface UpdateVariantInput {
  stock: number;
}

export interface ProductVariantEntity {
  id: string;
  productId: string;
  size: string;
  stock: number;
  createdAt: Date;
}

export interface IProductRepository {
  // ── Produits ──────────────────────────────────────────────────
  findAll(filters?: ProductFilters): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
findLatest(limit: number, daysOld?: number): Promise<ProductEntity[]>;
  findAllAdmin(): Promise<ProductEntity[]>; 
create(input: CreateProductInput): Promise<ProductEntity>;
  update(id: string, input: UpdateProductInput): Promise<ProductEntity>;
  delete(id: string): Promise<void>;

  // ── Variants (tailles) ────────────────────────────────────────
  getVariants(productId: string): Promise<ProductVariantEntity[]>;
  findVariantById(variantId: string): Promise<ProductVariantEntity | null>;
  addVariant(productId: string, input: CreateVariantInput): Promise<ProductVariantEntity>;
  updateVariant(variantId: string, input: UpdateVariantInput): Promise<ProductVariantEntity>;
  deleteVariant(variantId: string): Promise<void>;
}

export const PRODUCT_REPOSITORY = Symbol('IProductRepository');