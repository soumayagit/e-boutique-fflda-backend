import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  CUSTOMER   = 'CUSTOMER',
  ADMIN      = 'ADMIN',
  MANAGER    = 'MANAGER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export class UpdateRoleDto {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}