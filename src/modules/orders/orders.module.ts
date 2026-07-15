import { Module } from '@nestjs/common';
import { OrderController } from './infrastructure/order.controller';
import { OrderService } from './application/use-cases/order.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { InvoiceService } from './application/use-cases/invoice.service';



@Module({
  imports:     [PrismaModule,MailModule],
 controllers: [OrderController],
  providers:   [OrderService,InvoiceService],
  exports:     [OrderService],
  
})
export class OrdersModule {}