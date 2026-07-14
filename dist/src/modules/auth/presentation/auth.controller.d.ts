import type { CurrentUserPayload } from '../infrastructure/decorators/current-user.decorator';
import { AuthService } from '../application/use-cases/auth.service';
import { RegisterDto } from '../application/dtos/register.dto';
import { LoginDto } from '../application/dtos/login.dto';
import { RefreshTokenDto } from '../application/dtos/refresh-token.dto';
import { ForgotPasswordDto } from '../application/dtos/forgot-password.dto';
import { ResetPasswordDto } from '../application/dtos/reset-password.dto';
import { AuthResponseDto, TokensResponseDto, UserResponseDto } from '../application/dtos/auth-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
    refresh(dto: RefreshTokenDto): Promise<TokensResponseDto>;
    logout(dto: RefreshTokenDto): Promise<void>;
    logoutAll(user: CurrentUserPayload): Promise<void>;
    getProfile(user: CurrentUserPayload): Promise<UserResponseDto>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
