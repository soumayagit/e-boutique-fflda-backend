import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      { apiVersion: '2026-05-27.dahlia' }
    );
  }

  async createPaymentIntent(amount: number, currency: string, orderId: string) {
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { orderId },
      automatic_payment_methods: { enabled: true },
    });

    return {
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
    };
  }

  constructWebhookEvent(payload: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!,
    );
  }
async createCheckoutSession(amount: number, orderId: string, currency: string = 'eur') {
  const frontendUrl = this.configService.get<string>('FRONTEND_URL') ?? 'http://localhost:60888';
  
  const session = await this.stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: `Commande FFLDA #${orderId}`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${frontendUrl}/#/payment-success`,
    cancel_url:  `${frontendUrl}/#/payment-cancel`,
    metadata: { orderId },
  });

  return { url: session.url };
}
}