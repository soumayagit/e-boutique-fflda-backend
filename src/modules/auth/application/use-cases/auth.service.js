// src/modules/auth/application/use-cases/auth.service.ts

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { IAuthRepository, AUTH_REPOSITORY } from '../../domain/ports/auth.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import {
  AuthResponseDto,
  TokensResponseDto,
  UserResponseDto,
} from '../dtos/auth-response.dto';
import { JwtPayload } from '../../infrastructure/strategies/jwt.strategy';

const BCRYPT_ROUNDS     = 12;
const REFRESH_EXPIRY_DAYS = 7;

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepo: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ── REGISTER ──────────────────────────────────────────────────────────────
  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const exists = await this.authRepo.findByEmail(dto.email);
    if (exists) throw new ConflictException('Un compte avec cet email existe déjà');

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const user = await this.authRepo.create({
      email:        dto.email,
      passwordHash,
      firstName:    dto.firstName,
      lastName:     dto.lastName,
      phone:        dto.phone,
    });

    const tokens = await this.issueTokens(user);
    return { ...tokens, user: this.toDto(user) };
  }

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.authRepo.findByEmail(dto.email);

    // Constant-time comparison even when user not found (prevent timing attacks)
    const hash = user?.passwordHash ?? '$2b$12$invalidhashtopreventtimingattackxx';
    const valid = await bcrypt.compare(dto.password, hash);

    if (!user || !valid || !user.isActive) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const tokens = await this.issueTokens(user);
    return { ...tokens, user: this.toDto(user) };
  }

  // ── REFRESH ───────────────────────────────────────────────────────────────
  async refreshTokens(rawToken: string): Promise<TokensResponseDto> {
    const tokenHash = this.hash(rawToken);
    const stored    = await this.authRepo.findRefreshToken(tokenHash);

    if (!stored) {
      throw new UnauthorizedException('Refresh token introuvable');
    }
    if (stored.isRevoked) {
      // Token reuse detected — revoke all sessions (security)
      await this.authRepo.revokeAllUserTokens(stored.userId);
      throw new UnauthorizedException('Refresh token déjà utilisé — reconnectez-vous');
    }
    if (stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expiré');
    }

    // Rotate: revoke old token then issue new pair
    await this.authRepo.revokeRefreshToken(tokenHash);

    const user = await this.authRepo.findById(stored.userId);
    if (!user || !user.isActive) throw new UnauthorizedException('Compte désactivé');

    return this.issueTokens(user);
  }

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  async logout(rawToken: string): Promise<void> {
    await this.authRepo.revokeRefreshToken(this.hash(rawToken));
  }

  async logoutAll(userId: string): Promise<void> {
    await this.authRepo.revokeAllUserTokens(userId);
  }

  // ── PROFILE ───────────────────────────────────────────────────────────────
  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.authRepo.findById(userId);
    if (!user) throw new UnauthorizedException('Utilisateur introuvable');
    return this.toDto(user);
  }

  // ── INTERNALS ─────────────────────────────────────────────────────────────
  private async issueTokens(user: UserEntity): Promise<TokensResponseDto> {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };

    const [accessToken, rawRefreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret:    this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRY', '15m'),
      }),
      Promise.resolve(crypto.randomBytes(64).toString('hex')),
    ]);

    const tokenHash = this.hash(rawRefreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRY_DAYS);

    await this.authRepo.saveRefreshToken(user.id, tokenHash, expiresAt);

    return { accessToken, refreshToken: rawRefreshToken };
  }

  private hash(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private toDto(user: UserEntity): UserResponseDto {
    return {
      id:            user.id,
      email:         user.email,
      firstName:     user.firstName,
      lastName:      user.lastName,
      role:          user.role,
      emailVerified: user.emailVerified,
      createdAt:     user.createdAt,
    };
  }
}
