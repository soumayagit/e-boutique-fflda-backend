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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("../application/use-cases/cart.service");
const cart_dto_1 = require("../application/dto/cart.dto");
const jwt_auth_guard_1 = require("../../auth/infrastructure/guards/jwt-auth.guard");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(req) {
        return this.cartService.getOrCreateCart(req.user.id);
    }
    addItem(req, dto) {
        return this.cartService.addItem(req.user.id, dto);
    }
    async addItemWithPlan(req, file, body) {
        if (!file)
            throw new Error('Fichier manquant ou vide');
        const dto = {
            productId: body.productId,
            quantity: parseInt(body.quantity) || 1,
            epaisseur: body.epaisseur ? parseFloat(body.epaisseur) : undefined,
            planFileUrl: `/uploads/plans/${file.filename}`,
        };
        return this.cartService.addItem(req.user.id, dto);
    }
    updateItem(req, id, dto) {
        return this.cartService.updateItem(req.user.id, id, dto);
    }
    removeItem(req, id) {
        return this.cartService.removeItem(req.user.id, id);
    }
    clearCart(req) {
        return this.cartService.clearCart(req.user.id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupère le panier' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Ajoute un article au panier' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_dto_1.AddCartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)('items/upload-plan'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload plan tapis + ajout au panier' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['productId', 'quantity', 'epaisseur', 'file'],
            properties: {
                productId: {
                    type: 'string',
                    example: 'uuid-du-produit-tapis',
                    description: 'ID du produit tapis',
                },
                quantity: {
                    type: 'integer',
                    example: 1,
                    description: 'Quantité',
                },
                epaisseur: {
                    type: 'number',
                    example: 4,
                    description: 'Épaisseur en cm (toujours obligatoire)',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Plan de la salle (PDF, PNG, JPEG ou JPG)',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/plans',
            filename: (req, file, cb) => {
                const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `plan-${unique}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowed = ['.pdf', '.png', '.jpg', '.jpeg'];
            const ext = (0, path_1.extname)(file.originalname).toLowerCase();
            if (!allowed.includes(ext)) {
                return cb(new Error('Format non autorisé. PDF, PNG, JPEG ou JPG uniquement.'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItemWithPlan", null);
__decorate([
    (0, common_1.Put)('items/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifie la quantité d\'un article' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, cart_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprime un article du panier' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Vide le panier' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('cart'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map