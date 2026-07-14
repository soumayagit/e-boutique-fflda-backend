import { PrismaService } from '../../../../prisma/prisma.service';
import type { IAuthRepository, CreateUserInput } from '../../domain/ports/auth.repository';
import { UserEntity } from '../../domain/entities/user.entity';
export declare class PrismaAuthRepository implements IAuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    create(input: CreateUserInput): Promise<UserEntity>;
    saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
    findRefreshToken(tokenHash: string): Promise<{
        userId: string;
        isRevoked: boolean;
        expiresAt: Date;
    } | null>;
    revokeRefreshToken(tokenHash: string): Promise<void>;
    revokeAllUserTokens(userId: string): Promise<void>;
    saveResetToken(userId: string, token: string, expires: Date): Promise<void>;
    findByResetToken(token: string): Promise<UserEntity | null>;
    updatePasswordAndClearToken(userId: string, hashedPassword: string): Promise<void>;
    private toEntity;
}
