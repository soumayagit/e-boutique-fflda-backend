import {
  Controller, Get, Post, Delete,
  Param, UseGuards, Request,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Wishlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getWishlist(@Request() req: any) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Post(':productId')
  addToWishlist(
    @Request() req: any,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.addToWishlist(req.user.id, productId);
  }

  @Delete(':productId')
  removeFromWishlist(
    @Request() req: any,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.removeFromWishlist(req.user.id, productId);
  }

  @Get(':productId/check')
  checkWishlist(
    @Request() req: any,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.isInWishlist(req.user.id, productId);
  }
}