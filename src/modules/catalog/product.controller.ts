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
import { CreateVariantDto } from './application/dtos/create-variant.dto';
import { UpdateVariantDto } from './application/dtos/update-variant.dto';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt-auth.guard';
import { Public } from '../auth/infrastructure/decorators/public.decorator';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ── Produits ────────────────────────────────────────────────────────────────

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

  @Get('admin/all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Liste tous les produits (admin, actifs et inactifs)' })
  findAllAdmin() {
    return this.productService.findAllAdmin();
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

  // ── Variants (tailles) ───────────────────────────────────────────────────────

  @Get(':id/variants')
  @Public()
  @ApiOperation({ summary: 'Liste les tailles disponibles d\'un produit' })
  getVariants(@Param('id') id: string) {
    return this.productService.getVariants(id);
  }

  @Post(':id/variants')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Ajoute une taille à un produit' })
  addVariant(@Param('id') id: string, @Body() dto: CreateVariantDto) {
    return this.productService.addVariant(id, dto);
  }

  @Put(':id/variants/:variantId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Met à jour le stock d\'une taille' })
  updateVariant(
    @Param('id') id: string,
    @Param('variantId') variantId: string,
    @Body() dto: UpdateVariantDto,
  ) {
    return this.productService.updateVariant(id, variantId, dto);
  }

  @Delete(':id/variants/:variantId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Supprime une taille d\'un produit' })
  deleteVariant(
    @Param('id') id: string,
    @Param('variantId') variantId: string,
  ) {
    return this.productService.deleteVariant(id, variantId);
  }
}