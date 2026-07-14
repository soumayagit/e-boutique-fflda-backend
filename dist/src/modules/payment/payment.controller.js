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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const stripe_service_1 = require("./infrastructure/stripe.service");
const create_payment_intent_dto_1 = require("./application/dto/create-payment-intent.dto");
const create_paypal_order_dto_1 = require("./application/dto/create-paypal-order.dto");
const public_decorator_1 = require("../auth/infrastructure/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("../orders/application/use-cases/order.service");
let PaymentController = class PaymentController {
    paymentService;
    stripeService;
    orderService;
    constructor(paymentService, stripeService, orderService) {
        this.paymentService = paymentService;
        this.stripeService = stripeService;
        this.orderService = orderService;
    }
    async createIntent(dto) {
        return this.paymentService.createIntent(dto);
    }
    async handleWebhook(req, signature) {
        const rawBody = req.rawBody;
        if (!rawBody) {
            throw new Error('Raw body manquant');
        }
        const event = this.stripeService.constructWebhookEvent(rawBody, signature);
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const orderId = session.metadata?.orderId;
                console.log('✅ Checkout Stripe complété:', orderId);
                if (orderId) {
                    await this.orderService.confirmPaymentAndNotify(orderId);
                }
                break;
            }
            case 'payment_intent.succeeded': {
                const intent = event.data.object;
                const orderId = intent.metadata?.orderId;
                console.log('✅ Paiement Stripe réussi:', orderId);
                if (orderId) {
                    await this.orderService.confirmPaymentAndNotify(orderId);
                }
                break;
            }
            case 'payment_intent.payment_failed':
                console.log('❌ Paiement Stripe échoué:', event.data.object);
                break;
            default:
                console.log(`Événement non géré: ${event.type}`);
        }
        return { received: true };
    }
    async createPaypalOrder(dto) {
        return this.paymentService.createPaypalOrder(dto);
    }
    async capturePaypalOrder(orderId) {
        const result = await this.paymentService.capturePaypalOrder(orderId);
        await this.orderService.confirmPaymentAndNotify(orderId);
        return result;
    }
    async createCheckoutSession(dto) {
        return this.stripeService.createCheckoutSession(dto.amount, dto.orderId, dto.currency);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('create-intent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_intent_dto_1.CreatePaymentIntentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createIntent", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleWebhook", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('paypal/create-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paypal_order_dto_1.CreatePaypalOrderDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPaypalOrder", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('paypal/capture/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "capturePaypalOrder", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('create-checkout-session'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_intent_dto_1.CreatePaymentIntentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createCheckoutSession", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        stripe_service_1.StripeService,
        order_service_1.OrderService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map