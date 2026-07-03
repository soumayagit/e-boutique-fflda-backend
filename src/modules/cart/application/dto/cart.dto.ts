import { ApiProperty } from '@nestjs/swagger';
import {
  IsString, IsInt, IsOptional, Min, IsNumber, IsPositive,
} from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({ example: 'uuid-produit' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 'uuid-variant', required: false })
  @IsOptional()
  @IsString()
  variantId?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  // ── US338 Tapis de lutte — Surface simple ─────────────────────
  @ApiProperty({ example: 1200, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  longueur?: number;

  @ApiProperty({ example: 800, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  largeur?: number;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  epaisseur?: number;

  // ── US338 Tapis de lutte — Surface complexe ───────────────────
  @ApiProperty({ example: '/uploads/plan-salle.pdf', required: false })
  @IsOptional()
  @IsString()
  planFileUrl?: string;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  quantity: number;
}