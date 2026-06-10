import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './application/use-cases/product.service';
import { CreateProductDto, UpdateProductDto } from './application/dtos/product.dto';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt-auth.guard';
import { Public } from '../auth/infrastructure/decorators/public.decorator';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Liste tous les produits' })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'search', required: false })
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
  ) {
    return this.productService.findAll(categoryId, search);
  }

  @Get('latest')
  @Public()
  @ApiOperation({ summary: 'Derniers produits ajoutés' })
  @ApiQuery({ name: 'limit', required: false })
  findLatest(@Query('limit') limit?: string) {
    return this.productService.findLatest(limit ? parseInt(limit) : 4);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Récupère un produit par ID' })
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crée un produit' })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Modifie un produit' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Supprime un produit' })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}