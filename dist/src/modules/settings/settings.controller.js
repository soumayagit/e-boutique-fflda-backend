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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/infrastructure/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/infrastructure/guards/admin.guard");
const settings_service_1 = require("./settings.service");
const UPLOAD_DIR = './uploads';
const ALLOWED_VIDEO_MIME = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
let SettingsController = class SettingsController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getSettings() {
        return this.settingsService.getSettings();
    }
    async uploadHeroVideo(file) {
        if (!file)
            throw new common_1.BadRequestException('Aucun fichier reçu');
        const url = `https://boutique-fflda.fr/uploads/${file.filename}`;
        await this.settingsService.updateHeroVideo(url);
        return { url };
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, common_1.Post)('admin/settings/hero-video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: UPLOAD_DIR,
            filename: (_req, file, cb) => {
                cb(null, `hero-${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        limits: { fileSize: MAX_VIDEO_SIZE },
        fileFilter: (_req, file, cb) => {
            if (!ALLOWED_VIDEO_MIME.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException('Format vidéo non autorisé (mp4, webm, mov uniquement)'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "uploadHeroVideo", null);
exports.SettingsController = SettingsController = __decorate([
    (0, swagger_1.ApiTags)('settings'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map