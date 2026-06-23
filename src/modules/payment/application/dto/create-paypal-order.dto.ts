import { IsNumber, IsString, Min } from 'class-validator';

export class CreatePaypalOrderDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  orderId: string;
}