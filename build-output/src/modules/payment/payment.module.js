"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const payment_controller_1 = require("./payment.controller");
const payment_service_1 = require("./payment.service");
const stripe_service_1 = require("./infrastructure/stripe.service");
const create_payment_intent_use_case_1 = require("./application/use-cases/create-payment-intent.use-case");
const paypal_service_1 = require("./infrastructure/paypal.service");
const create_paypal_order_use_case_1 = require("./application/use-cases/create-paypal-order.use-case");
const capture_paypal_order_use_case_1 = require("./application/use-cases/capture-paypal-order.use-case");
const orders_module_1 = require("../orders/orders.module");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, orders_module_1.OrdersModule],
        controllers: [payment_controller_1.PaymentController],
        providers: [
            payment_service_1.PaymentService,
            stripe_service_1.StripeService,
            create_payment_intent_use_case_1.CreatePaymentIntentUseCase,
            paypal_service_1.PaypalService,
            create_paypal_order_use_case_1.CreatePaypalOrderUseCase,
            capture_paypal_order_use_case_1.CapturePaypalOrderUseCase,
        ],
        exports: [payment_service_1.PaymentService],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map