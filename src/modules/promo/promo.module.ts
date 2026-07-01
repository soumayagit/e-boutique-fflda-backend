import { Module }          from '@nestjs/common';
import { PromoController } from './infrastructure/promo.controller';
import { PromoService }    from './application/use-cases/promo.service';
import { PrismaService }   from '../../../prisma/prisma.service';

@Module({
  controllers: [PromoController],
  providers:   [PromoService, PrismaService],
  exports:     [PromoService],
})
export class PromoModule {}