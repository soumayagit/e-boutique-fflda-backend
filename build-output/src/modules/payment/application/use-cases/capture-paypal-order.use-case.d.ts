import { PaypalService } from '../../infrastructure/paypal.service';
export declare class CapturePaypalOrderUseCase {
    private readonly paypalService;
    constructor(paypalService: PaypalService);
    execute(paypalOrderId: string): Promise<{
        paypalOrderId: string;
        status: string;
        captureId: string;
        simulated: boolean;
    }>;
}
