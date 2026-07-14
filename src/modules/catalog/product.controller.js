"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/infrastructure/guards/jwt-auth.guard");
var public_decorator_1 = require("../auth/infrastructure/decorators/public.decorator");
var ProductController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('products'), (0, common_1.Controller)('products')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _findAll_decorators;
    var _findLatest_decorators;
    var _findAllAdmin_decorators;
    var _findById_decorators;
    var _create_decorators;
    var _update_decorators;
    var _delete_decorators;
    var _getVariants_decorators;
    var _addVariant_decorators;
    var _updateVariant_decorators;
    var _deleteVariant_decorators;
    var ProductController = _classThis = /** @class */ (function () {
        function ProductController_1(productService) {
            this.productService = (__runInitializers(this, _instanceExtraInitializers), productService);
        }
        // ── Produits ────────────────────────────────────────────────────────────────
        ProductController_1.prototype.findAll = function (categoryId, search) {
            return this.productService.findAll(categoryId, search);
        };
        ProductController_1.prototype.findLatest = function (limit) {
            return this.productService.findLatest(limit ? parseInt(limit) : 4);
        };
        ProductController_1.prototype.findAllAdmin = function () {
            return this.productService.findAllAdmin();
        };
        ProductController_1.prototype.findById = function (id) {
            return this.productService.findById(id);
        };
        ProductController_1.prototype.create = function (dto) {
            return this.productService.create(dto);
        };
        ProductController_1.prototype.update = function (id, dto) {
            return this.productService.update(id, dto);
        };
        ProductController_1.prototype.delete = function (id) {
            return this.productService.delete(id);
        };
        // ── Variants (tailles) ───────────────────────────────────────────────────────
        ProductController_1.prototype.getVariants = function (id) {
            return this.productService.getVariants(id);
        };
        ProductController_1.prototype.addVariant = function (id, dto) {
            return this.productService.addVariant(id, dto);
        };
        ProductController_1.prototype.updateVariant = function (id, variantId, dto) {
            return this.productService.updateVariant(id, variantId, dto);
        };
        ProductController_1.prototype.deleteVariant = function (id, variantId) {
            return this.productService.deleteVariant(id, variantId);
        };
        return ProductController_1;
    }());
    __setFunctionName(_classThis, "ProductController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _findAll_decorators = [(0, common_1.Get)(), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Liste tous les produits' }), (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false }), (0, swagger_1.ApiQuery)({ name: 'search', required: false })];
        _findLatest_decorators = [(0, common_1.Get)('latest'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Derniers produits ajoutés' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false })];
        _findAllAdmin_decorators = [(0, common_1.Get)('admin/all'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Liste tous les produits (admin, actifs et inactifs)' })];
        _findById_decorators = [(0, common_1.Get)(':id'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Récupère un produit par ID' })];
        _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Crée un produit' })];
        _update_decorators = [(0, common_1.Put)(':id'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Modifie un produit' })];
        _delete_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Supprime un produit' })];
        _getVariants_decorators = [(0, common_1.Get)(':id/variants'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Liste les tailles disponibles d\'un produit' })];
        _addVariant_decorators = [(0, common_1.Post)(':id/variants'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Ajoute une taille à un produit' })];
        _updateVariant_decorators = [(0, common_1.Put)(':id/variants/:variantId'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Met à jour le stock d\'une taille' })];
        _deleteVariant_decorators = [(0, common_1.Delete)(':id/variants/:variantId'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: 'Supprime une taille d\'un produit' })];
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findLatest_decorators, { kind: "method", name: "findLatest", static: false, private: false, access: { has: function (obj) { return "findLatest" in obj; }, get: function (obj) { return obj.findLatest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllAdmin_decorators, { kind: "method", name: "findAllAdmin", static: false, private: false, access: { has: function (obj) { return "findAllAdmin" in obj; }, get: function (obj) { return obj.findAllAdmin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findById_decorators, { kind: "method", name: "findById", static: false, private: false, access: { has: function (obj) { return "findById" in obj; }, get: function (obj) { return obj.findById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: function (obj) { return "delete" in obj; }, get: function (obj) { return obj.delete; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getVariants_decorators, { kind: "method", name: "getVariants", static: false, private: false, access: { has: function (obj) { return "getVariants" in obj; }, get: function (obj) { return obj.getVariants; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addVariant_decorators, { kind: "method", name: "addVariant", static: false, private: false, access: { has: function (obj) { return "addVariant" in obj; }, get: function (obj) { return obj.addVariant; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateVariant_decorators, { kind: "method", name: "updateVariant", static: false, private: false, access: { has: function (obj) { return "updateVariant" in obj; }, get: function (obj) { return obj.updateVariant; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteVariant_decorators, { kind: "method", name: "deleteVariant", static: false, private: false, access: { has: function (obj) { return "deleteVariant" in obj; }, get: function (obj) { return obj.deleteVariant; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductController = _classThis;
}();
exports.ProductController = ProductController;
