import { ConfigService } from '@nestjs/config';
export declare class PaypalService {
    private configService;
    private clientId;
    private clientSecret;
    private baseUrl;
    private isSimulated;
    constructor(configService: ConfigService);
    private getAccessToken;
    createOrder(amount: number, currency: string, orderId: string): Promise<{
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
    captureOrder(paypalOrderId: string, internalOrderId?: string): Promise<{
        paypalOrderId: string;
        status: string;
        captureId: string;
        internalOrderId: string | undefined;
        simulated: boolean;
    }>;
}
