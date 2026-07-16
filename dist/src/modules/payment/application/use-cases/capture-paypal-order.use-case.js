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
exports.CapturePaypalOrderUseCase = void 0;
const common_1 = require("@nestjs/common");
const paypal_service_1 = require("../../infrastructure/paypal.service");
let CapturePaypalOrderUseCase = class CapturePaypalOrderUseCase {
    paypalService;
    constructor(paypalService) {
        this.paypalService = paypalService;
    }
    async execute(paypalOrderId, internalOrderId) {
        return this.paypalService.captureOrder(paypalOrderId, internalOrderId);
    }
};
exports.CapturePaypalOrderUseCase = CapturePaypalOrderUseCase;
exports.CapturePaypalOrderUseCase = CapturePaypalOrderUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [paypal_service_1.PaypalService])
], CapturePaypalOrderUseCase);
//# sourceMappingURL=capture-paypal-order.use-case.js.map