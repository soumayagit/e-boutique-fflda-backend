import { PromoService } from '../application/use-cases/promo.service';
import { CreatePromoDto, ApplyPromoDto } from '../application/dto/promo.dto';
export declare class PromoController {
    private readonly promoService;
    constructor(promoService: PromoService);
    create(dto: CreatePromoDto): Promise<{
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
    findAll(): Promise<{
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
    toggle(id: string): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
    apply(dto: ApplyPromoDto): Promise<{
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
