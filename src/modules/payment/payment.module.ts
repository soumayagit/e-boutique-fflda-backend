import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { StripeService } from './infrastructure/stripe.service';
import { CreatePaymentIntentUseCase } from './application/use-cases/create-payment-intent.use-case';
import { PaypalService } from './infrastructure/paypal.service';
import { CreatePaypalOrderUseCase } from './application/use-cases/create-paypal-order.use-case';
import { CapturePaypalOrderUseCase } from './application/use-cases/capture-paypal-order.use-case';

@Module({
  imports: [ConfigModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    StripeService,
    CreatePaymentIntentUseCase,
    PaypalService,             // ← ajout
    CreatePaypalOrderUseCase,  // ← ajout
    CapturePaypalOrderUseCase, // ← ajout
  ],
  exports: [PaymentService],
})
export class PaymentModule {}