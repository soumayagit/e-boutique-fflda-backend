import {
  Injectable, NotFoundException,
  BadRequestException, ConflictException,
} from '@nestjs/common';
import { PrismaService }             from '../../../../../prisma/prisma.service';
import { CreatePromoDto, ApplyPromoDto } from '../dto/promo.dto';

@Injectable()
export class PromoService {
  constructor(private readonly prisma: PrismaService) {}

  async createPromo(dto: CreatePromoDto) {
    const existing = await this.prisma.promoCode.findUnique({
      where: { code: dto.code.toUpperCase() },
    });
    if (existing) throw new ConflictException('Ce code promo existe déjà');

    return this.prisma.promoCode.create({
      data: {
        code:           dto.code.toUpperCase(),
        discountType:   dto.discountType ?? 'PERCENTAGE',
        discountValue:  dto.discountValue,
        minOrderAmount: dto.minOrderAmount ?? 0,
        maxUses:        dto.maxUses ?? null,
        isActive:       dto.isActive ?? true,
        expiresAt:      dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
    });
  }

  async getAllPromos() {
    return this.prisma.promoCode.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async togglePromo(id: string) {
    const promo = await this.prisma.promoCode.findUnique({ where: { id } });
    if (!promo) throw new NotFoundException('Code promo introuvable');
    return this.prisma.promoCode.update({
      where: { id },
      data:  { isActive: !promo.isActive },
    });
  }

  async deletePromo(id: string) {
    const promo = await this.prisma.promoCode.findUnique({ where: { id } });
    if (!promo) throw new NotFoundException('Code promo introuvable');
    await this.prisma.promoCode.delete({ where: { id } });
    return { message: 'Code promo supprimé' };
  }

  async applyPromo(dto: ApplyPromoDto) {
    const promo = await this.prisma.promoCode.findUnique({
      where: { code: dto.code.toUpperCase() },
    });

    if (!promo)          throw new NotFoundException('Code promo invalide');
    if (!promo.isActive) throw new BadRequestException('Ce code promo est désactivé');
    if (promo.expiresAt && new Date() > promo.expiresAt)
      throw new BadRequestException('Ce code promo a expiré');
    if (promo.maxUses && promo.usedCount >= promo.maxUses)
      throw new BadRequestException('Ce code promo a atteint sa limite d\'utilisation');
    if (dto.orderAmount < (promo.minOrderAmount ?? 0))
      throw new BadRequestException(`Commande minimum de ${promo.minOrderAmount}€ requise`);

    let discountAmount = 0;
    if (promo.discountType === 'PERCENTAGE') {
      discountAmount = Math.round(
          (dto.orderAmount * promo.discountValue / 100) * 100) / 100;
    } else {
      discountAmount = Math.min(promo.discountValue, dto.orderAmount);
    }

    const newTotal = Math.round((dto.orderAmount - discountAmount) * 100) / 100;

    return {
      valid:         true,
      code:          promo.code,
      discountType:  promo.discountType,
      discountValue: promo.discountValue,
      discountAmount,
      originalTotal: dto.orderAmount,
      newTotal,
      promoId:       promo.id,
    };
  }
}