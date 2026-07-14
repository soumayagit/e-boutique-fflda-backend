"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogModule = void 0;
const common_1 = require("@nestjs/common");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./application/use-cases/category.service");
const prisma_category_repository_1 = require("./infrastructure/adapters/prisma-category.repository");
const category_repository_1 = require("./domain/ports/category.repository");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./application/use-cases/product.service");
const prisma_product_repository_1 = require("./infrastructure/adapters/prisma-product.repository");
const product_repository_1 = require("./domain/ports/product.repository");
const prisma_service_1 = require("../../prisma/prisma.service");
const dimension_ocr_controller_1 = require("./infrastructure/dimension-ocr.controller");
const dimension_ocr_service_1 = require("./application/use-cases/dimension-ocr.service");
let CatalogModule = class CatalogModule {
};
exports.CatalogModule = CatalogModule;
exports.CatalogModule = CatalogModule = __decorate([
    (0, common_1.Module)({
        controllers: [category_controller_1.CategoryController, product_controller_1.ProductController, dimension_ocr_controller_1.DimensionOcrController],
        providers: [
            category_service_1.CategoryService,
            prisma_service_1.PrismaService,
            {
                provide: category_repository_1.CATEGORY_REPOSITORY,
                useClass: prisma_category_repository_1.PrismaCategoryRepository,
            },
            product_service_1.ProductService,
            {
                provide: product_repository_1.PRODUCT_REPOSITORY,
                useClass: prisma_product_repository_1.PrismaProductRepository,
            },
            dimension_ocr_service_1.DimensionOcrService,
        ],
        exports: [category_service_1.CategoryService, product_service_1.ProductService],
    })
], CatalogModule);
//# sourceMappingURL=catalog.module.js.map