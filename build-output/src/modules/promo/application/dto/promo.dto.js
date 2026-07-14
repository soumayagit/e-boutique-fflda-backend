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
exports.ApplyPromoDto = exports.CreatePromoDto = exports.DiscountType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "PERCENTAGE";
    DiscountType["FIXED"] = "FIXED";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
class CreatePromoDto {
    code;
    discountType;
    discountValue;
    minOrderAmount;
    maxUses;
    isActive;
    expiresAt;
}
exports.CreatePromoDto = CreatePromoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FFLDA2026' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DiscountType, default: DiscountType.PERCENTAGE }),
    (0, class_validator_1.IsEnum)(DiscountType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "discountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePromoDto.prototype, "discountValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePromoDto.prototype, "minOrderAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePromoDto.prototype, "maxUses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePromoDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "expiresAt", void 0);
class ApplyPromoDto {
    code;
    orderAmount;
}
exports.ApplyPromoDto = ApplyPromoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FFLDA2026' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyPromoDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 89.90 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ApplyPromoDto.prototype, "orderAmount", void 0);
//# sourceMappingURL=promo.dto.js.map