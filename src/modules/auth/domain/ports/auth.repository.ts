// src/modules/auth/domain/ports/auth.repository.ts
import { UserEntity } from '../entities/user.entity';

export interface CreateUserInput {
  email:        string;
  passwordHash: string;
  firstName:    string;
  lastName:     string;
  phone?:       string;
}

export interface IAuthRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  create(input: CreateUserInput): Promise<UserEntity>;
  saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
  findRefreshToken(tokenHash: string): Promise<{ userId: string; isRevoked: boolean; expiresAt: Date } | null>;
  revokeRefreshToken(tokenHash: string): Promise<void>;
  revokeAllUserTokens(userId: string): Promise<void>;

  // ← ajout reset password
  saveResetToken(userId: string, token: string, expires: Date): Promise<void>;
  findByResetToken(token: string): Promise<UserEntity | null>;
  updatePasswordAndClearToken(userId: string, hashedPassword: string): Promise<void>;
}

export const AUTH_REPOSITORY = Symbol('IAuthRepository');