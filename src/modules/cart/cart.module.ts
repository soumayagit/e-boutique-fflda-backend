import { Module } from '@nestjs/common';
import { CartController } from './infrastructure/cart.controller';
import { CartService } from './application/use-cases/cart.service';
import { PrismaModule } from '../../../prisma/prisma.module'; 

@Module({
  imports:     [PrismaModule],
  controllers: [CartController],
  providers:   [CartService],
  exports:     [CartService],
})
export class CartModule {}