import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type { ICategoryRepository, CreateCategoryInput, UpdateCategoryInput } from '../../domain/ports/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    return categories.map(c => this.toEntity(c));
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    return category ? this.toEntity(category) : null;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findUnique({ where: { name } });
    return category ? this.toEntity(category) : null;
  }

  async create(input: CreateCategoryInput): Promise<CategoryEntity> {
    const category = await this.prisma.category.create({ data: input });
    return this.toEntity(category);
  }

  async update(id: string, input: UpdateCategoryInput): Promise<CategoryEntity> {
    const category = await this.prisma.category.update({
      where: { id },
      data: input,
    });
    return this.toEntity(category);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  private toEntity(raw: any): CategoryEntity {
    const e         = new CategoryEntity();
    e.id          = raw.id;
    e.name        = raw.name;
    e.description = raw.description;
    e.imageUrl    = raw.imageUrl;
    e.isActive    = raw.isActive;
    e.createdAt   = raw.createdAt;
    e.updatedAt   = raw.updatedAt;
    return e;
  }
}