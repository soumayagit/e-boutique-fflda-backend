import { PrismaService } from '../../../../prisma/prisma.service';
import type { ICategoryRepository, CreateCategoryInput, UpdateCategoryInput } from '../../domain/ports/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';
export declare class PrismaCategoryRepository implements ICategoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<CategoryEntity[]>;
    findById(id: string): Promise<CategoryEntity | null>;
    findByName(name: string): Promise<CategoryEntity | null>;
    create(input: CreateCategoryInput): Promise<CategoryEntity>;
    update(id: string, input: UpdateCategoryInput): Promise<CategoryEntity>;
    delete(id: string): Promise<void>;
    private toEntity;
}
