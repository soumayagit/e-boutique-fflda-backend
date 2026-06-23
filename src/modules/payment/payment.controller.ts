import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  HttpCode,
  Param,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request } from 'express';
import { PaymentService } from './payment.service';
import { StripeService } from './infrastructure/stripe.service';
import { CreatePaymentIntentDto } from './application/dto/create-payment-intent.dto';
import { CreatePaypalOrderDto } from './application/dto/create-paypal-order.dto';
import { Public } from '../auth/infrastructure/decorators/public.decorator';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly stripeService: StripeService,
  ) {}

  // ── Stripe ────────────────────────────────────────────────────────────────

  @Public()
  @Post('create-intent')
  async createIntent(@Body() dto: CreatePaymentIntentDto) {
    return this.paymentService.createIntent(dto);
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = req.rawBody;
    if (!rawBody) {
      throw new Error('Raw body manquant');
    }

    const event = this.stripeService.constructWebhookEvent(
      rawBody,
      signature,
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('✅ Paiement Stripe réussi:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        console.log('❌ Paiement Stripe échoué:', event.data.object);
        break;
      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    return { received: true };
  }

  // ── PayPal ────────────────────────────────────────────────────────────────

  @Public()
  @Post('paypal/create-order')
  async createPaypalOrder(@Body() dto: CreatePaypalOrderDto) {
    return this.paymentService.createPaypalOrder(dto);
  }

  @Public()
  @Post('paypal/capture/:orderId')
  async capturePaypalOrder(@Param('orderId') orderId: string) {
    return this.paymentService.capturePaypalOrder(orderId);
  }
}