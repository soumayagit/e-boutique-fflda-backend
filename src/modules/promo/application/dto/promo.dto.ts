import { IsString, IsEnum, IsNumber, IsOptional,
         IsBoolean, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED      = 'FIXED',
}

export class CreatePromoDto {
  @ApiProperty({ example: 'FFLDA2026' })
  @IsString()
  code: string;

  @ApiProperty({ enum: DiscountType, default: DiscountType.PERCENTAGE })
  @IsEnum(DiscountType)
  @IsOptional()
  discountType?: DiscountType;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  discountValue: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  minOrderAmount?: number;

  @ApiProperty({ example: 100, required: false })
  @IsNumber()
  @IsOptional()
  maxUses?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  expiresAt?: string;
}

export class ApplyPromoDto {
  @ApiProperty({ example: 'FFLDA2026' })
  @IsString()
  code: string;

  @ApiProperty({ example: 89.90 })
  @IsNumber()
  orderAmount: number;
}