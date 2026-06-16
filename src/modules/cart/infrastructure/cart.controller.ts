import {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards, Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from '../application/use-cases/cart.service';
import { AddCartItemDto, UpdateCartItemDto } from '../application/dto/cart.dto';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère le panier de l\'utilisateur connecté' })
  getCart(@Request() req: any) {
    return this.cartService.getOrCreateCart(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Ajoute un article au panier' })
  addItem(@Request() req: any, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(req.user.id, dto);
  }

  @Put('items/:id')
  @ApiOperation({ summary: 'Modifie la quantité d\'un article' })
  updateItem(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(req.user.id, id, dto);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Supprime un article du panier' })
  removeItem(@Request() req: any, @Param('id') id: string) {
    return this.cartService.removeItem(req.user.id, id);
  }

  @Delete()
  @ApiOperation({ summary: 'Vide le panier' })
  clearCart(@Request() req: any) {
    return this.cartService.clearCart(req.user.id);
  }
}