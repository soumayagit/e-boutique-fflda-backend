import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min } from 'class-validator';

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
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  quantity: number;
}