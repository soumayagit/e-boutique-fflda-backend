"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const auth_repository_1 = require("../../domain/ports/auth.repository");
const mail_service_1 = require("../../../mail/mail.service");
const FAKE_HASH = '$' + '2b';
let AuthService = class AuthService {
    authRepo;
    jwtService;
    config;
    mailService;
    constructor(authRepo, jwtService, config, mailService) {
        this.authRepo = authRepo;
        this.jwtService = jwtService;
        this.config = config;
        this.mailService = mailService;
    }
    async register(dto) {
        const exists = await this.authRepo.findByEmail(dto.email);
        if (exists)
            throw new common_1.ConflictException('Un compte avec cet email existe deja');
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const user = await this.authRepo.create({
            email: dto.email,
            passwordHash,
            firstName: dto.firstName,
            lastName: dto.lastName,
            phone: dto.phone,
        });
        const tokens = await this.issueTokens(user);
        return { ...tokens, user: this.toDto(user) };
    }
    async login(dto) {
        const user = await this.authRepo.findByEmail(dto.email);
        const hash = user?.passwordHash ?? FAKE_HASH;
        const valid = await bcrypt.compare(dto.password, hash);
        if (!user || !valid || !user.isActive) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        const tokens = await this.issueTokens(user);
        return { ...tokens, user: this.toDto(user) };
    }
    async refreshTokens(rawToken) {
        const tokenHash = this.hash(rawToken);
        const stored = await this.authRepo.findRefreshToken(tokenHash);
        if (!stored)
            throw new common_1.UnauthorizedException('Refresh token introuvable');
        if (stored.isRevoked) {
            await this.authRepo.revokeAllUserTokens(stored.userId);
            throw new common_1.UnauthorizedException('Refresh token deja utilise');
        }
        if (stored.expiresAt < new Date())
            throw new common_1.UnauthorizedException('Refresh token expire');
        await this.authRepo.revokeRefreshToken(tokenHash);
        const user = await this.authRepo.findById(stored.userId);
        if (!user || !user.isActive)
            throw new common_1.UnauthorizedException('Compte desactive');
        return this.issueTokens(user);
    }
    async logout(rawToken) {
        await this.authRepo.revokeRefreshToken(this.hash(rawToken));
    }
    async logoutAll(userId) {
        await this.authRepo.revokeAllUserTokens(userId);
    }
    async getProfile(userId) {
        const user = await this.authRepo.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        return this.toDto(user);
    }
    async forgotPassword(email) {
        const user = await this.authRepo.findByEmail(email);
        console.log('User trouvé:', user);
        if (!user)
            throw new common_1.NotFoundException('Email introuvable');
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000);
        await this.authRepo.saveResetToken(user.id, token, expires);
        await this.mailService.sendResetEmail(email, token);
        return { message: 'Email de réinitialisation envoyé' };
    }
    async resetPassword(token, newPassword) {
        const user = await this.authRepo.findByResetToken(token);
        if (!user)
            throw new common_1.BadRequestException('Token invalide ou expiré');
        const hashed = await bcrypt.hash(newPassword, 12);
        await this.authRepo.updatePasswordAndClearToken(user.id, hashed);
        return { message: 'Mot de passe réinitialisé avec succès' };
    }
    async issueTokens(user) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.config.get('JWT_ACCESS_SECRET'),
            expiresIn: '15m',
        });
        const rawRefreshToken = crypto.randomBytes(64).toString('hex');
        const tokenHash = this.hash(rawRefreshToken);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.authRepo.saveRefreshToken(user.id, tokenHash, expiresAt);
        return { accessToken, refreshToken: rawRefreshToken };
    }
    hash(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
    toDto(user) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_repository_1.AUTH_REPOSITORY)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map