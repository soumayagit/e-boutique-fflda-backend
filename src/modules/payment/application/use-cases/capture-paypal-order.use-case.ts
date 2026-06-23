import { Injectable } from '@nestjs/common';
import { PaypalService } from '../../infrastructure/paypal.service';

@Injectable()
export class CapturePaypalOrderUseCase {
  constructor(private readonly paypalService: PaypalService) {}

  async execute(paypalOrderId: string) {
    return this.paypalService.captureOrder(paypalOrderId);
  }
}