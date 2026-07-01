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
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from '../orders/application/use-cases/order.service'; // ← ajout

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly stripeService: StripeService,
    private readonly orderService: OrderService, // ← ajout
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
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const orderId = session.metadata?.orderId;
        console.log('✅ Checkout Stripe complété:', orderId);
        if (orderId) {
          await this.orderService.confirmPaymentAndNotify(orderId);
        }
        break;
      }
      case 'payment_intent.succeeded': {
        const intent  = event.data.object as any;
        const orderId = intent.metadata?.orderId;
        console.log('✅ Paiement Stripe réussi:', orderId);
        if (orderId) {
          await this.orderService.confirmPaymentAndNotify(orderId);
        }
        break;
      }
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
    const result = await this.paymentService.capturePaypalOrder(orderId);
    // ← envoie l'email après capture réussie du paiement
    await this.orderService.confirmPaymentAndNotify(orderId);
    return result;
  }

  @Public()
  @Post('create-checkout-session')
  async createCheckoutSession(@Body() dto: CreatePaymentIntentDto) {
    return this.stripeService.createCheckoutSession(
      dto.amount,
      dto.orderId,
      dto.currency,
    );
  }
}