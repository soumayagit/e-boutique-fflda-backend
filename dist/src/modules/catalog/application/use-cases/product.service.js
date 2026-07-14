"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../../domain/ports/product.repository");
let ProductService = class ProductService {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async findAll(categoryId, search) {
        return this.productRepo.findAll({ categoryId, search });
    }
    async findLatest(limit = 4) {
        return this.productRepo.findLatest(limit, 30);
    }
    async findAllAdmin() {
        return this.productRepo.findAllAdmin();
    }
    async findById(id) {
        const product = await this.productRepo.findById(id);
        if (!product)
            throw new common_1.NotFoundException('Produit introuvable');
        return product;
    }
    async create(dto) {
        return this.productRepo.create(dto);
    }
    async update(id, dto) {
        await this.findById(id);
        return this.productRepo.update(id, dto);
    }
    async delete(id) {
        await this.findById(id);
        return this.productRepo.delete(id);
    }
    async getVariants(productId) {
        await this.findById(productId);
        return this.productRepo.getVariants(productId);
    }
    async addVariant(productId, dto) {
        await this.findById(productId);
        return this.productRepo.addVariant(productId, dto);
    }
    async updateVariant(productId, variantId, dto) {
        await this.findById(productId);
        const variant = await this.productRepo.findVariantById(variantId);
        if (!variant)
            throw new common_1.NotFoundException('Taille introuvable');
        return this.productRepo.updateVariant(variantId, dto);
    }
    async deleteVariant(productId, variantId) {
        await this.findById(productId);
        const variant = await this.productRepo.findVariantById(variantId);
        if (!variant)
            throw new common_1.NotFoundException('Taille introuvable');
        return this.productRepo.deleteVariant(variantId);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(product_repository_1.PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ProductService);
//# sourceMappingURL=product.service.js.map