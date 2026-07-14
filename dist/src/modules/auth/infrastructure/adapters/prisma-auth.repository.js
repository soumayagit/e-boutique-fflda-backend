"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const user_entity_1 = require("../../domain/entities/user.entity");
let PrismaAuthRepository = class PrismaAuthRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? this.toEntity(user) : null;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ? this.toEntity(user) : null;
    }
    async create(input) {
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
    async saveRefreshToken(userId, tokenHash, expiresAt) {
        await this.prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } });
    }
    async findRefreshToken(tokenHash) {
        return this.prisma.refreshToken.findFirst({
            where: { tokenHash },
            select: { userId: true, isRevoked: true, expiresAt: true },
        });
    }
    async revokeRefreshToken(tokenHash) {
        await this.prisma.refreshToken.updateMany({
            where: { tokenHash },
            data: { isRevoked: true },
        });
    }
    async revokeAllUserTokens(userId) {
        await this.prisma.refreshToken.updateMany({
            where: { userId, isRevoked: false },
            data: { isRevoked: true },
        });
    }
    async saveResetToken(userId, token, expires) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                resetToken: token,
                resetTokenExpiry: expires,
            },
        });
    }
    async findByResetToken(token) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() },
            },
        });
        return user ? this.toEntity(user) : null;
    }
    async updatePasswordAndClearToken(userId, hashedPassword) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                passwordHash: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
    }
    toEntity(raw) {
        const e = new user_entity_1.UserEntity();
        e.id = raw.id;
        e.email = raw.email;
        e.passwordHash = raw.passwordHash;
        e.firstName = raw.firstName;
        e.lastName = raw.lastName;
        e.phone = raw.phone;
        e.role = raw.role;
        e.isActive = raw.isActive;
        e.emailVerified = raw.emailVerified;
        e.createdAt = raw.createdAt;
        e.updatedAt = raw.updatedAt;
        return e;
    }
};
exports.PrismaAuthRepository = PrismaAuthRepository;
exports.PrismaAuthRepository = PrismaAuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAuthRepository);
//# sourceMappingURL=prisma-auth.repository.js.map