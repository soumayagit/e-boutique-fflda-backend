import { CategoryService } from './application/use-cases/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './application/dtos/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<import("./domain/entities/category.entity").CategoryEntity[]>;
    findById(id: string): Promise<import("./domain/entities/category.entity").CategoryEntity>;
    create(dto: CreateCategoryDto): Promise<import("./domain/entities/category.entity").CategoryEntity>;
    update(id: string, dto: UpdateCategoryDto): Promise<import("./domain/entities/category.entity").CategoryEntity>;
    delete(id: string): Promise<void>;
}
