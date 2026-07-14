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
exports.DimensionOcrController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const dimension_ocr_service_1 = require("../application/use-cases/dimension-ocr.service");
const jwt_auth_guard_1 = require("../../auth/infrastructure/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let DimensionOcrController = class DimensionOcrController {
    ocrService;
    constructor(ocrService) {
        this.ocrService = ocrService;
    }
    async extractDimensions(file) {
        if (!file) {
            return { error: 'Aucune image fournie' };
        }
        return this.ocrService.extractDimensions(file.buffer);
    }
};
exports.DimensionOcrController = DimensionOcrController;
__decorate([
    (0, common_1.Post)('extract-dimensions'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DimensionOcrController.prototype, "extractDimensions", null);
exports.DimensionOcrController = DimensionOcrController = __decorate([
    (0, swagger_1.ApiTags)('Catalog'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [dimension_ocr_service_1.DimensionOcrService])
], DimensionOcrController);
//# sourceMappingURL=dimension-ocr.controller.js.map