"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const category_entity_1 = require("../../domain/entities/category.entity");
let PrismaCategoryRepository = class PrismaCategoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const categories = await this.prisma.category.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
        return categories.map(c => this.toEntity(c));
    }
    async findById(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        return category ? this.toEntity(category) : null;
    }
    async findByName(name) {
        const category = await this.prisma.category.findUnique({ where: { name } });
        return category ? this.toEntity(category) : null;
    }
    async create(input) {
        const category = await this.prisma.category.create({ data: input });
        return this.toEntity(category);
    }
    async update(id, input) {
        const category = await this.prisma.category.update({
            where: { id },
            data: input,
        });
        return this.toEntity(category);
    }
    async delete(id) {
        await this.prisma.category.delete({ where: { id } });
    }
    toEntity(raw) {
        const e = new category_entity_1.CategoryEntity();
        e.id = raw.id;
        e.name = raw.name;
        e.description = raw.description;
        e.imageUrl = raw.imageUrl;
        e.isActive = raw.isActive;
        e.createdAt = raw.createdAt;
        e.updatedAt = raw.updatedAt;
        return e;
    }
};
exports.PrismaCategoryRepository = PrismaCategoryRepository;
exports.PrismaCategoryRepository = PrismaCategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCategoryRepository);
//# sourceMappingURL=prisma-category.repository.js.map