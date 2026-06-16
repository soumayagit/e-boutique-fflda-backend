import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsIn } from 'class-validator';

export class CreateVariantDto {
  @ApiProperty({ example: 'M', enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] })
  @IsString()
  @IsIn(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
  size: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock: number;
}