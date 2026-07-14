import { CreatePaymentIntentUseCase } from './application/use-cases/create-payment-intent.use-case';
import { CreatePaymentIntentDto } from './application/dto/create-payment-intent.dto';
import { CreatePaypalOrderUseCase } from './application/use-cases/create-paypal-order.use-case';
import { CapturePaypalOrderUseCase } from './application/use-cases/capture-paypal-order.use-case';
import { CreatePaypalOrderDto } from './application/dto/create-paypal-order.dto';
export declare class PaymentService {
    private readonly createPaymentIntentUseCase;
    private readonly createPaypalOrderUseCase;
    private readonly capturePaypalOrderUseCase;
    constructor(createPaymentIntentUseCase: CreatePaymentIntentUseCase, createPaypalOrderUseCase: CreatePaypalOrderUseCase, capturePaypalOrderUseCase: CapturePaypalOrderUseCase);
    createIntent(dto: CreatePaymentIntentDto): Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
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
    capturePaypalOrder(paypalOrderId: string): Promise<{
        paypalOrderId: string;
        status: string;
        captureId: string;
        simulated: boolean;
    }>;
}
