import { CategoryEntity } from '../entities/category.entity';

export interface CreateCategoryInput {
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity | null>;
  findByName(name: string): Promise<CategoryEntity | null>;
  create(input: CreateCategoryInput): Promise<CategoryEntity>;
  update(id: string, input: UpdateCategoryInput): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
}

export const CATEGORY_REPOSITORY = Symbol('ICategoryRepository');