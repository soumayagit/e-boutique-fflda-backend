import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReviewsService } from '../application/reviews.service';
import { CreateReviewDto } from '../application/dto/create-review.dto';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { Public } from '../../auth/infrastructure/decorators/public.decorator'; // adapte chemin/nom

@Controller('products/:productId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // GET /products/:productId/reviews
  @Public()
  @Get()
  findAll(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  // GET /products/:productId/reviews/stats
  @Public()
  @Get('stats')
  getStats(@Param('productId') productId: string) {
    return this.reviewsService.getStats(productId);
  }

  // POST /products/:productId/reviews  (authentification requise)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('productId') productId: string,
    @Body() dto: CreateReviewDto,
    @Req() req: any,
  ) {
    const userId = req.user.id ?? req.user.sub;
    return this.reviewsService.create(productId, userId, dto);
  }
}