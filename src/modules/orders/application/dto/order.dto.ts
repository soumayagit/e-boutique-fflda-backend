import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Jean' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '12 rue de la Paix' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Paris' })
  @IsString()
  city: string;

  @ApiProperty({ example: '75001' })
  @IsString()
  postalCode: string;

  @ApiProperty({ example: '+33612345678', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Laisser devant la porte', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}