import {
  Controller, Get, Post, Delete, Patch,
  Body, Param, UseGuards,
} from '@nestjs/common';
import { PromoService }              from '../application/use-cases/promo.service';
import { CreatePromoDto, ApplyPromoDto } from '../application/dto/promo.dto';
import { JwtAuthGuard }              from '../../auth/infrastructure/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags }    from '@nestjs/swagger';

@ApiTags('Promotions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  create(@Body() dto: CreatePromoDto) {
    return this.promoService.createPromo(dto);
  }

  @Get()
  findAll() {
    return this.promoService.getAllPromos();
  }

  @Patch(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.promoService.togglePromo(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoService.deletePromo(id);
  }

  @Post('apply')
  apply(@Body() dto: ApplyPromoDto) {
    return this.promoService.applyPromo(dto);
  }
}