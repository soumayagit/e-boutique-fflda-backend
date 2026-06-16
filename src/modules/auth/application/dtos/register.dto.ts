import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Jean' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'jean.dupont@email.com' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty({ example: '+33612345678', required: false })
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'MotDePasse1!',
    description:
      'Minimum 8 caractères, avec majuscule, minuscule, chiffre et caractère spécial',
  })
  @IsString()
  @MinLength(8, { message: 'Minimum 8 caractères' })
  @Matches(/(?=.*[A-Z])/, { message: 'Au moins une majuscule' })
  @Matches(/(?=.*[a-z])/, { message: 'Au moins une minuscule' })
  @Matches(/(?=.*[0-9])/, { message: 'Au moins un chiffre' })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Au moins un caractère spécial',
  })
  password: string;
}