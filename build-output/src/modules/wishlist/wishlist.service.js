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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let WishlistService = class WishlistService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWishlist(userId) {
        const items = await this.prisma.wishlistItem.findMany({
            where: { userId },
            include: {
                product: {
                    include: { category: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return items.map((item) => ({
            id: item.id,
            createdAt: item.createdAt,
            product: {
                id: item.product.id,
                name: item.product.name,
                description: item.product.description,
                price: Number(item.product.price),
                imageUrl: item.product.imageUrl,
                stock: item.product.stock,
                category: item.product.category.name,
            },
        }));
    }
    async addToWishlist(userId, productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Produit introuvable');
        const existing = await this.prisma.wishlistItem.findFirst({
            where: { userId, productId },
        });
        if (existing)
            return { message: 'Déjà dans les favoris' };
        await this.prisma.wishlistItem.create({
            data: { userId, productId },
        });
        return { message: 'Ajouté aux favoris' };
    }
    async removeFromWishlist(userId, productId) {
        const item = await this.prisma.wishlistItem.findFirst({
            where: { userId, productId },
        });
        if (!item)
            throw new common_1.NotFoundException('Favori introuvable');
        await this.prisma.wishlistItem.delete({ where: { id: item.id } });
        return { message: 'Retiré des favoris' };
    }
    async isInWishlist(userId, productId) {
        const item = await this.prisma.wishlistItem.findFirst({
            where: { userId, productId },
        });
        return !!item;
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map