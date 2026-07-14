import type { RawBodyRequest } from '@nestjs/common';
import type { Request } from 'express';
import { PaymentService } from './payment.service';
import { StripeService } from './infrastructure/stripe.service';
import { CreatePaymentIntentDto } from './application/dto/create-payment-intent.dto';
import { CreatePaypalOrderDto } from './application/dto/create-paypal-order.dto';
import { OrderService } from '../orders/application/use-cases/order.service';
export declare class PaymentController {
    private readonly paymentService;
    private readonly stripeService;
    private readonly orderService;
    constructor(paymentService: PaymentService, stripeService: StripeService, orderService: OrderService);
    createIntent(dto: CreatePaymentIntentDto): Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
    }>;
    handleWebhook(req: RawBodyRequest<Request>, signature: string): Promise<{
        received: boolean;
    }>;
    createPaypalOrder(dto: CreatePaypalOrderDto): Promise<{
        orderId: string;
        approvalUrl: null;
        simulated: boolean;
        message: string;
    } | {
        orderId: string;
        approvalUrl: string | undefined;
        simulated: boolean;
        message?: undefined;
    }>;
    capturePaypalOrder(orderId: string): Promise<{
        paypalOrderId: string;
        status: string;
        captureId: string;
        simulated: boolean;
    }>;
    createCheckoutSession(dto: CreatePaymentIntentDto): Promise<{
        url: string | null;
    }>;
}
