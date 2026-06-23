import { Injectable } from '@nestjs/common';
import { CreatePaymentIntentUseCase } from './application/use-cases/create-payment-intent.use-case';
import { CreatePaymentIntentDto } from './application/dto/create-payment-intent.dto';
import { CreatePaypalOrderUseCase } from './application/use-cases/create-paypal-order.use-case';
import { CapturePaypalOrderUseCase } from './application/use-cases/capture-paypal-order.use-case';
import { CreatePaypalOrderDto } from './application/dto/create-paypal-order.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly createPaymentIntentUseCase: CreatePaymentIntentUseCase,
    private readonly createPaypalOrderUseCase: CreatePaypalOrderUseCase,
    private readonly capturePaypalOrderUseCase: CapturePaypalOrderUseCase,
  ) {}

  async createIntent(dto: CreatePaymentIntentDto) {
    return this.createPaymentIntentUseCase.execute(dto);
  }

  async createPaypalOrder(dto: CreatePaypalOrderDto) {
    return this.createPaypalOrderUseCase.execute(dto);
  }

  async capturePaypalOrder(paypalOrderId: string) {
    return this.capturePaypalOrderUseCase.execute(paypalOrderId);
  }
}