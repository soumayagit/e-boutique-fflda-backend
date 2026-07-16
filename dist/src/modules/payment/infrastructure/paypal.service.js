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
exports.PaypalService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let PaypalService = class PaypalService {
    configService;
    clientId;
    clientSecret;
    baseUrl;
    isSimulated;
    constructor(configService) {
        this.configService = configService;
        this.clientId = this.configService.get('PAYPAL_CLIENT_ID') ?? '';
        this.clientSecret = this.configService.get('PAYPAL_CLIENT_SECRET') ?? '';
        this.baseUrl = 'https://api-m.sandbox.paypal.com';
        this.isSimulated =
            !this.clientId ||
                this.clientId === 'SIMULATED' ||
                this.clientId === 'PAYPAL_SANDBOX_CLIENT_ID';
        console.log('🔶 PayPal isSimulated:', this.isSimulated);
    }
    async getAccessToken() {
        const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
        const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });
        const data = await response.json();
        return data.access_token;
    }
    async createOrder(amount, currency, orderId) {
        if (this.isSimulated) {
            console.log('🔶 PayPal createOrder simulé');
            return {
                orderId: `SIMULATED_PAYPAL_${Date.now()}`,
                approvalUrl: null,
                simulated: true,
                message: 'PayPal Sandbox non configuré — intégration prévue en V2',
            };
        }
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: orderId,
                        amount: {
                            currency_code: currency.toUpperCase(),
                            value: amount.toFixed(2),
                        },
                        description: `Commande FFLDA #${orderId}`,
                    },
                ],
                application_context: {
                    brand_name: 'FFLDA',
                    landing_page: 'BILLING',
                    user_action: 'PAY_NOW',
                    return_url: 'http://localhost:60888/#/payment-success',
                    cancel_url: 'http://localhost:60888/#/payment-cancel',
                },
            }),
        });
        const data = await response.json();
        const approvalUrl = data.links?.find((link) => link.rel === 'approve')?.href;
        return {
            orderId: data.id,
            approvalUrl,
            simulated: false,
        };
    }
    async captureOrder(paypalOrderId, internalOrderId) {
        if (this.isSimulated || paypalOrderId.startsWith('SIMULATED_')) {
            return {
                paypalOrderId,
                status: 'COMPLETED',
                captureId: `SIMULATED_CAPTURE_${Date.now()}`,
                internalOrderId,
                simulated: true,
            };
        }
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return {
            paypalOrderId: data.id,
            status: data.status,
            captureId: data.purchase_units[0]?.payments?.captures[0]?.id,
            internalOrderId: data.purchase_units[0]?.reference_id,
            simulated: false,
        };
    }
};
exports.PaypalService = PaypalService;
exports.PaypalService = PaypalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaypalService);
//# sourceMappingURL=paypal.service.js.map