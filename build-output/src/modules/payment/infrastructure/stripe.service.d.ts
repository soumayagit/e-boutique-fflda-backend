import { ConfigService } from '@nestjs/config';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createPaymentIntent(amount: number, currency: string, orderId: string): Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
    }>;
    constructWebhookEvent(payload: Buffer, signature: string): import("node_modules/stripe/cjs/resources/Events").Event;
    createCheckoutSession(amount: number, orderId: string, currency?: string): Promise<{
        url: string | null;
    }>;
}
