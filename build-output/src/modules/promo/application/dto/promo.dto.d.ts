export declare enum DiscountType {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED"
}
export declare class CreatePromoDto {
    code: string;
    discountType?: DiscountType;
    discountValue: number;
    minOrderAmount?: number;
    maxUses?: number;
    isActive?: boolean;
    expiresAt?: string;
}
export declare class ApplyPromoDto {
    code: string;
    orderAmount: number;
}
