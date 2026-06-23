export class Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  stripePaymentIntentId: string;
  createdAt: Date;
}