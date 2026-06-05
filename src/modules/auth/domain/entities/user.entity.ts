// src/modules/auth/domain/entities/user.entity.ts

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN       = 'ADMIN',
  MANAGER     = 'MANAGER',
  SUPPORT     = 'SUPPORT',
  CUSTOMER    = 'CUSTOMER',
}

export class UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: Role;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin(): boolean {
    return [Role.SUPER_ADMIN, Role.ADMIN].includes(this.role);
  }

  hasRole(...roles: Role[]): boolean {
    return roles.includes(this.role);
  }
}
