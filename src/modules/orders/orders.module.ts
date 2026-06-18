import { Module } from '@nestjs/common';
import { OrderController } from './infrastructure/order.controller';
import { OrderService } from './application/use-cases/order.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';



@Module({
  imports:     [PrismaModule,MailModule],
 controllers: [OrderController],
  providers:   [OrderService],
  exports:     [OrderService],
  
})
export class OrdersModule {}