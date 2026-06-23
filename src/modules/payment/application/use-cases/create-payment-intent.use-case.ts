import { Injectable } from '@nestjs/common';
import { StripeService } from '../../infrastructure/stripe.service';
import { CreatePaymentIntentDto } from '../dto/create-payment-intent.dto';

@Injectable()
export class CreatePaymentIntentUseCase {
  constructor(private readonly stripeService: StripeService) {}

  async execute(dto: CreatePaymentIntentDto) {
    return this.stripeService.createPaymentIntent(
      dto.amount,
      dto.currency,
      dto.orderId,
    );
  }
}