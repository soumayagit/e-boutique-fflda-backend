import { Module } from '@nestjs/common';
import { OrderController } from './infrastructure/order.controller';
import { OrderService } from './application/use-cases/order.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports:     [PrismaModule],
  controllers: [OrderController],
  providers:   [OrderService],
  exports:     [OrderService],
})
export class OrdersModule {}