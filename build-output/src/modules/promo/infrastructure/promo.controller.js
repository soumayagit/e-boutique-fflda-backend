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
exports.PromoController = void 0;
const common_1 = require("@nestjs/common");
const promo_service_1 = require("../application/use-cases/promo.service");
const promo_dto_1 = require("../application/dto/promo.dto");
const jwt_auth_guard_1 = require("../../auth/infrastructure/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let PromoController = class PromoController {
    promoService;
    constructor(promoService) {
        this.promoService = promoService;
    }
    create(dto) {
        return this.promoService.createPromo(dto);
    }
    findAll() {
        return this.promoService.getAllPromos();
    }
    toggle(id) {
        return this.promoService.togglePromo(id);
    }
    remove(id) {
        return this.promoService.deletePromo(id);
    }
    apply(dto) {
        return this.promoService.applyPromo(dto);
    }
};
exports.PromoController = PromoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [promo_dto_1.CreatePromoDto]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/toggle'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "toggle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('apply'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [promo_dto_1.ApplyPromoDto]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "apply", null);
exports.PromoController = PromoController = __decorate([
    (0, swagger_1.ApiTags)('Promotions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('promo'),
    __metadata("design:paramtypes", [promo_service_1.PromoService])
], PromoController);
//# sourceMappingURL=promo.controller.js.map