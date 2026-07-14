"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartItemDto = exports.AddCartItemDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var AddCartItemDto = function () {
    var _a;
    var _productId_decorators;
    var _productId_initializers = [];
    var _productId_extraInitializers = [];
    var _variantId_decorators;
    var _variantId_initializers = [];
    var _variantId_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _longueur_decorators;
    var _longueur_initializers = [];
    var _longueur_extraInitializers = [];
    var _largeur_decorators;
    var _largeur_initializers = [];
    var _largeur_extraInitializers = [];
    var _epaisseur_decorators;
    var _epaisseur_initializers = [];
    var _epaisseur_extraInitializers = [];
    var _planFileUrl_decorators;
    var _planFileUrl_initializers = [];
    var _planFileUrl_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AddCartItemDto() {
                this.productId = __runInitializers(this, _productId_initializers, void 0);
                this.variantId = (__runInitializers(this, _productId_extraInitializers), __runInitializers(this, _variantId_initializers, void 0));
                this.quantity = (__runInitializers(this, _variantId_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
                // ── US338 Tapis de lutte — Surface simple ─────────────────────
                this.longueur = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _longueur_initializers, void 0));
                this.largeur = (__runInitializers(this, _longueur_extraInitializers), __runInitializers(this, _largeur_initializers, void 0));
                this.epaisseur = (__runInitializers(this, _largeur_extraInitializers), __runInitializers(this, _epaisseur_initializers, void 0));
                // ── US338 Tapis de lutte — Surface complexe ───────────────────
                this.planFileUrl = (__runInitializers(this, _epaisseur_extraInitializers), __runInitializers(this, _planFileUrl_initializers, void 0));
                __runInitializers(this, _planFileUrl_extraInitializers);
            }
            return AddCartItemDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _productId_decorators = [(0, swagger_1.ApiProperty)({ example: 'uuid-produit' }), (0, class_validator_1.IsString)()];
            _variantId_decorators = [(0, swagger_1.ApiProperty)({ example: 'uuid-variant', required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _quantity_decorators = [(0, swagger_1.ApiProperty)({ example: 1 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _longueur_decorators = [(0, swagger_1.ApiProperty)({ example: 1200, required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)()];
            _largeur_decorators = [(0, swagger_1.ApiProperty)({ example: 800, required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)()];
            _epaisseur_decorators = [(0, swagger_1.ApiProperty)({ example: 4, required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)()];
            _planFileUrl_decorators = [(0, swagger_1.ApiProperty)({ example: '/uploads/plan-salle.pdf', required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } }, metadata: _metadata }, _productId_initializers, _productId_extraInitializers);
            __esDecorate(null, null, _variantId_decorators, { kind: "field", name: "variantId", static: false, private: false, access: { has: function (obj) { return "variantId" in obj; }, get: function (obj) { return obj.variantId; }, set: function (obj, value) { obj.variantId = value; } }, metadata: _metadata }, _variantId_initializers, _variantId_extraInitializers);
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            __esDecorate(null, null, _longueur_decorators, { kind: "field", name: "longueur", static: false, private: false, access: { has: function (obj) { return "longueur" in obj; }, get: function (obj) { return obj.longueur; }, set: function (obj, value) { obj.longueur = value; } }, metadata: _metadata }, _longueur_initializers, _longueur_extraInitializers);
            __esDecorate(null, null, _largeur_decorators, { kind: "field", name: "largeur", static: false, private: false, access: { has: function (obj) { return "largeur" in obj; }, get: function (obj) { return obj.largeur; }, set: function (obj, value) { obj.largeur = value; } }, metadata: _metadata }, _largeur_initializers, _largeur_extraInitializers);
            __esDecorate(null, null, _epaisseur_decorators, { kind: "field", name: "epaisseur", static: false, private: false, access: { has: function (obj) { return "epaisseur" in obj; }, get: function (obj) { return obj.epaisseur; }, set: function (obj, value) { obj.epaisseur = value; } }, metadata: _metadata }, _epaisseur_initializers, _epaisseur_extraInitializers);
            __esDecorate(null, null, _planFileUrl_decorators, { kind: "field", name: "planFileUrl", static: false, private: false, access: { has: function (obj) { return "planFileUrl" in obj; }, get: function (obj) { return obj.planFileUrl; }, set: function (obj, value) { obj.planFileUrl = value; } }, metadata: _metadata }, _planFileUrl_initializers, _planFileUrl_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AddCartItemDto = AddCartItemDto;
var UpdateCartItemDto = function () {
    var _a;
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateCartItemDto() {
                this.quantity = __runInitializers(this, _quantity_initializers, void 0);
                __runInitializers(this, _quantity_extraInitializers);
            }
            return UpdateCartItemDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _quantity_decorators = [(0, swagger_1.ApiProperty)({ example: 3 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateCartItemDto = UpdateCartItemDto;
