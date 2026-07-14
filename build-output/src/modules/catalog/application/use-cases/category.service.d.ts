import type { ICategoryRepository } from '../../domain/ports/category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
export declare class CategoryService {
    private readonly categoryRepo;
    constructor(categoryRepo: ICategoryRepository);
    findAll(): Promise<CategoryEntity[]>;
    findById(id: string): Promise<CategoryEntity>;
    create(dto: CreateCategoryDto): Promise<CategoryEntity>;
    update(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity>;
    delete(id: string): Promise<void>;
}
