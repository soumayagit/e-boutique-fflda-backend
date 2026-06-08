import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import type { ICategoryRepository } from '../../domain/ports/category.repository';
import { CATEGORY_REPOSITORY } from '../../domain/ports/category.repository';import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepo.findAll();
  }

  async findById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundException('Catégorie introuvable');
    return category;
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const exists = await this.categoryRepo.findByName(dto.name);
    if (exists) throw new ConflictException('Une catégorie avec ce nom existe déjà');
    return this.categoryRepo.create(dto);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    await this.findById(id);
    return this.categoryRepo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    return this.categoryRepo.delete(id);
  }
}