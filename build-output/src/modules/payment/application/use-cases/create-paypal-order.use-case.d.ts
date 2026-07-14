import { PaypalService } from '../../infrastructure/paypal.service';
import { CreatePaypalOrderDto } from '../dto/create-paypal-order.dto';
export declare class CreatePaypalOrderUseCase {
    private readonly paypalService;
    constructor(paypalService: PaypalService);
    execute(dto: CreatePaypalOrderDto): Promise<{
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
}
