import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './application/use-cases/category.service';
import { PrismaCategoryRepository } from './infrastructure/adapters/prisma-category.repository';
import { CATEGORY_REPOSITORY } from './domain/ports/category.repository';
import { ProductController } from './product.controller';
import { ProductService } from './application/use-cases/product.service';
import { PrismaProductRepository } from './infrastructure/adapters/prisma-product.repository';
import { PRODUCT_REPOSITORY } from './domain/ports/product.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { DimensionOcrController } from './infrastructure/dimension-ocr.controller'; // ← ajout
import { DimensionOcrService }    from './application/use-cases/dimension-ocr.service'; // ← ajout

@Module({
  controllers: [CategoryController, ProductController, DimensionOcrController], // ← ajout
  providers: [
    CategoryService,
    PrismaService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: PrismaCategoryRepository,
    },
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
    DimensionOcrService, // ← ajout
  ],
  exports: [CategoryService, ProductService],
})
export class CatalogModule {}