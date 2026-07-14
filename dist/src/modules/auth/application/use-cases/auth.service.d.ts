import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { IAuthRepository } from '../../domain/ports/auth.repository';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { AuthResponseDto, TokensResponseDto, UserResponseDto } from '../dtos/auth-response.dto';
import { MailService } from '../../../mail/mail.service';
export declare class AuthService {
    private readonly authRepo;
    private readonly jwtService;
    private readonly config;
    private readonly mailService;
    constructor(authRepo: IAuthRepository, jwtService: JwtService, config: ConfigService, mailService: MailService);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
    refreshTokens(rawToken: string): Promise<TokensResponseDto>;
    logout(rawToken: string): Promise<void>;
    logoutAll(userId: string): Promise<void>;
    getProfile(userId: string): Promise<UserResponseDto>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    private issueTokens;
    private hash;
    private toDto;
}
