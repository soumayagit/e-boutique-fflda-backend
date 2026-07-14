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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByProduct(productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Produit introuvable');
        }
        const reviews = await this.prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { firstName: true, lastName: true },
                },
            },
        });
        return reviews.map((review) => ({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            date: review.createdAt,
            userName: `${review.user.firstName} ${review.user.lastName}`.trim(),
        }));
    }
    async create(productId, userId, dto) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Produit introuvable');
        }
        const review = await this.prisma.review.create({
            data: {
                productId,
                userId,
                rating: dto.rating,
                comment: dto.comment ?? '',
            },
            include: {
                user: {
                    select: { firstName: true, lastName: true },
                },
            },
        });
        return {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            date: review.createdAt,
            userName: `${review.user.firstName} ${review.user.lastName}`.trim(),
        };
    }
    async getStats(productId) {
        const result = await this.prisma.review.aggregate({
            where: { productId },
            _avg: { rating: true },
            _count: { id: true },
        });
        return {
            averageRating: result._avg.rating ?? 0,
            reviewCount: result._count.id ?? 0,
        };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map