import { Module } from '@nestjs/common';
import { ReviewsService } from './application/reviews.service';
import { ReviewsController } from './infrastructure/reviews.controller';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}