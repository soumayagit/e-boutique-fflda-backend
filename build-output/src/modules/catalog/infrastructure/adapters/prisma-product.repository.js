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
exports.PrismaProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const product_entity_1 = require("../../domain/entities/product.entity");
let PrismaProductRepository = class PrismaProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const products = await this.prisma.product.findMany({
            where: {
                isActive: true,
                ...(filters?.categoryId && { categoryId: filters.categoryId }),
                ...(filters?.search && {
                    name: { contains: filters.search, mode: 'insensitive' },
                }),
            },
            orderBy: filters?.orderBy === 'price'
                ? { price: 'asc' }
                : filters?.orderBy === 'name'
                    ? { name: 'asc' }
                    : { createdAt: 'desc' },
            take: filters?.limit,
            include: {
                category: true,
                variants: { orderBy: { size: 'asc' } },
            },
        });
        return products.map(p => this.toEntity(p));
    }
    async findLatest(limit, daysOld = 30) {
        const dateFilter = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
        let products = await this.prisma.product.findMany({
            where: {
                isActive: true,
                createdAt: { gte: dateFilter },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                category: true,
                variants: { orderBy: { size: 'asc' } },
            },
        });
        if (products.length === 0) {
            products = await this.prisma.product.findMany({
                where: { isActive: true },
                orderBy: { createdAt: 'desc' },
                take: limit,
                include: {
                    category: true,
                    variants: { orderBy: { size: 'asc' } },
                },
            });
        }
        return products.map(p => this.toEntity(p));
    }
    async findAllAdmin() {
        const products = await this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                variants: { orderBy: { size: 'asc' } },
                reviews: { select: { rating: true } },
            },
        });
        return products.map(p => this.toEntity(p));
    }
    async findById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                variants: { orderBy: { size: 'asc' } },
            },
        });
        return product ? this.toEntity(product) : null;
    }
    async create(input) {
        const product = await this.prisma.product.create({
            data: {
                name: input.name,
                description: input.description,
                price: input.price,
                stock: input.stock,
                imageUrl: input.imageUrl,
                categoryId: input.categoryId,
                largeur: input.largeur ?? null,
                longueur: input.longueur ?? null,
                epaisseur: input.epaisseur ?? null,
            },
            include: {
                category: true,
                variants: true,
            },
        });
        return this.toEntity(product);
    }
    async update(id, input) {
        const product = await this.prisma.product.update({
            where: { id },
            data: input,
            include: {
                category: true,
                variants: { orderBy: { size: 'asc' } },
            },
        });
        return this.toEntity(product);
    }
    async delete(id) {
        await this.prisma.product.delete({ where: { id } });
    }
    async getVariants(productId) {
        return this.prisma.productVariant.findMany({
            where: { productId },
            orderBy: { size: 'asc' },
        });
    }
    async findVariantById(variantId) {
        return this.prisma.productVariant.findUnique({
            where: { id: variantId },
        });
    }
    async addVariant(productId, input) {
        return this.prisma.productVariant.create({
            data: {
                productId,
                size: input.size,
                stock: input.stock,
            },
        });
    }
    async updateVariant(variantId, input) {
        return this.prisma.productVariant.update({
            where: { id: variantId },
            data: { stock: input.stock },
        });
    }
    async deleteVariant(variantId) {
        await this.prisma.productVariant.delete({ where: { id: variantId } });
    }
    toEntity(raw) {
        const e = new product_entity_1.ProductEntity();
        e.id = raw.id;
        e.name = raw.name;
        e.description = raw.description;
        e.price = Number(raw.price);
        e.stock = raw.stock;
        e.imageUrl = raw.imageUrl;
        e.isActive = raw.isActive;
        e.categoryId = raw.categoryId;
        e.categoryName = raw.category?.name ?? null;
        e.createdAt = raw.createdAt;
        e.updatedAt = raw.updatedAt;
        e.variants = raw.variants ?? [];
        e.largeur = raw.largeur ?? null;
        e.longueur = raw.longueur ?? null;
        e.epaisseur = raw.epaisseur ?? null;
        return e;
    }
};
exports.PrismaProductRepository = PrismaProductRepository;
exports.PrismaProductRepository = PrismaProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProductRepository);
//# sourceMappingURL=prisma-product.repository.js.map