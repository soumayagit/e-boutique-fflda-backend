import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'ancienMotDePasse' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'nouveauMotDePasse123' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}