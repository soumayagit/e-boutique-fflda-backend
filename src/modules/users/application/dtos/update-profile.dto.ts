import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Nicolas' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Rami' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '+33612345678' })
  @IsOptional()
  phone?: string;
}