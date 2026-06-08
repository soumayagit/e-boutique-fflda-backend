import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './application/use-cases/category.service';
import { PrismaCategoryRepository } from './infrastructure/adapters/prisma-category.repository';
import { CATEGORY_REPOSITORY } from './domain/ports/category.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    PrismaService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [CategoryService],
})
export class CatalogModule {}