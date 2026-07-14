import { StripeService } from '../../infrastructure/stripe.service';
import { CreatePaymentIntentDto } from '../dto/create-payment-intent.dto';
export declare class CreatePaymentIntentUseCase {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    execute(dto: CreatePaymentIntentDto): Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
    }>;
}
