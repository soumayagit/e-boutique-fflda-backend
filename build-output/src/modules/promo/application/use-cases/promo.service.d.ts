import { PrismaService } from '../../../../../prisma/prisma.service';
import { CreatePromoDto, ApplyPromoDto } from '../dto/promo.dto';
export declare class PromoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPromo(dto: CreatePromoDto): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        updatedAt: Date;
        expiresAt: Date | null;
        code: string;
        discountType: import("@prisma/client").$Enums.DiscountType;
        discountValue: number;
        minOrderAmount: number | null;
        maxUses: number | null;
        usedCount: number;
    }>;
    getAllPromos(): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        updatedAt: Date;
        expiresAt: Date | null;
        code: string;
        discountType: import("@prisma/client").$Enums.DiscountType;
        discountValue: number;
        minOrderAmount: number | null;
        maxUses: number | null;
        usedCount: number;
    }[]>;
    togglePromo(id: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        updatedAt: Date;
        expiresAt: Date | null;
        code: string;
        discountType: import("@prisma/client").$Enums.DiscountType;
        discountValue: number;
        minOrderAmount: number | null;
        maxUses: number | null;
        usedCount: number;
    }>;
    deletePromo(id: string): Promise<{
        message: string;
    }>;
    applyPromo(dto: ApplyPromoDto): Promise<{
        valid: boolean;
        code: string;
        discountType: import("@prisma/client").$Enums.DiscountType;
        discountValue: number;
        discountAmount: number;
        originalTotal: number;
        newTotal: number;
        promoId: string;
    }>;
}
