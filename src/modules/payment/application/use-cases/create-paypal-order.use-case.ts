import { Injectable } from '@nestjs/common';
import { PaypalService } from '../../infrastructure/paypal.service';
import { CreatePaypalOrderDto } from '../dto/create-paypal-order.dto';

@Injectable()
export class CreatePaypalOrderUseCase {
  constructor(private readonly paypalService: PaypalService) {}

  async execute(dto: CreatePaypalOrderDto) {
    return this.paypalService.createOrder(
      dto.amount,
      dto.currency,
      dto.orderId,
    );
  }
}