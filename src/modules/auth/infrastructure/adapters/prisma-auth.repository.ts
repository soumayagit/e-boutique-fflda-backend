import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type { IAuthRepository, CreateUserInput } from '../../domain/ports/auth.repository';
import { UserEntity, Role } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaAuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toEntity(user) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toEntity(user) : null;
  }

  async create(input: CreateUserInput): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
      },
    });
    return this.toEntity(user);
  }

  async saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
    await this.prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } });
  }

  async findRefreshToken(tokenHash: string): Promise<{ userId: string; isRevoked: boolean; expiresAt: Date } | null> {
    return this.prisma.refreshToken.findFirst({
      where: { tokenHash },
      select: { userId: true, isRevoked: true, expiresAt: true },
    });
  }

  async revokeRefreshToken(tokenHash: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { isRevoked: true },
    });
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    });
  }

  private toEntity(raw: any): UserEntity {
    const e = new UserEntity();
    e.id            = raw.id;
    e.email         = raw.email;
    e.passwordHash  = raw.passwordHash;
    e.firstName     = raw.firstName;
    e.lastName      = raw.lastName;
    e.phone         = raw.phone;
    e.role          = raw.role as Role;
    e.isActive      = raw.isActive;
    e.emailVerified = raw.emailVerified;
    e.createdAt     = raw.createdAt;
    e.updatedAt     = raw.updatedAt;
    return e;
  }
}