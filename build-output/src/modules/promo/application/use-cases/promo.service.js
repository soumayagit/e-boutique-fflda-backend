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
exports.PromoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../../prisma/prisma.service");
let PromoService = class PromoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPromo(dto) {
        const existing = await this.prisma.promoCode.findUnique({
            where: { code: dto.code.toUpperCase() },
        });
        if (existing)
            throw new common_1.ConflictException('Ce code promo existe déjà');
        return this.prisma.promoCode.create({
            data: {
                code: dto.code.toUpperCase(),
                discountType: dto.discountType ?? 'PERCENTAGE',
                discountValue: dto.discountValue,
                minOrderAmount: dto.minOrderAmount ?? 0,
                maxUses: dto.maxUses ?? null,
                isActive: dto.isActive ?? true,
                expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
            },
        });
    }
    async getAllPromos() {
        return this.prisma.promoCode.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async togglePromo(id) {
        const promo = await this.prisma.promoCode.findUnique({ where: { id } });
        if (!promo)
            throw new common_1.NotFoundException('Code promo introuvable');
        return this.prisma.promoCode.update({
            where: { id },
            data: { isActive: !promo.isActive },
        });
    }
    async deletePromo(id) {
        const promo = await this.prisma.promoCode.findUnique({ where: { id } });
        if (!promo)
            throw new common_1.NotFoundException('Code promo introuvable');
        await this.prisma.promoCode.delete({ where: { id } });
        return { message: 'Code promo supprimé' };
    }
    async applyPromo(dto) {
        const promo = await this.prisma.promoCode.findUnique({
            where: { code: dto.code.toUpperCase() },
        });
        if (!promo)
            throw new common_1.NotFoundException('Code promo invalide');
        if (!promo.isActive)
            throw new common_1.BadRequestException('Ce code promo est désactivé');
        if (promo.expiresAt && new Date() > promo.expiresAt)
            throw new common_1.BadRequestException('Ce code promo a expiré');
        if (promo.maxUses && promo.usedCount >= promo.maxUses)
            throw new common_1.BadRequestException('Ce code promo a atteint sa limite d\'utilisation');
        if (dto.orderAmount < (promo.minOrderAmount ?? 0))
            throw new common_1.BadRequestException(`Commande minimum de ${promo.minOrderAmount}€ requise`);
        let discountAmount = 0;
        if (promo.discountType === 'PERCENTAGE') {
            discountAmount = Math.round((dto.orderAmount * promo.discountValue / 100) * 100) / 100;
        }
        else {
            discountAmount = Math.min(promo.discountValue, dto.orderAmount);
        }
        const newTotal = Math.round((dto.orderAmount - discountAmount) * 100) / 100;
        return {
            valid: true,
            code: promo.code,
            discountType: promo.discountType,
            discountValue: promo.discountValue,
            discountAmount,
            originalTotal: dto.orderAmount,
            newTotal,
            promoId: promo.id,
        };
    }
};
exports.PromoService = PromoService;
exports.PromoService = PromoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromoService);
//# sourceMappingURL=promo.service.js.map