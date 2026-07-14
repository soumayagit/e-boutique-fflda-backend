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
exports.UpdateProductDto = exports.CreateProductDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var CreateProductDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _stock_decorators;
    var _stock_initializers = [];
    var _stock_extraInitializers = [];
    var _imageUrl_decorators;
    var _imageUrl_initializers = [];
    var _imageUrl_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _largeur_decorators;
    var _largeur_initializers = [];
    var _largeur_extraInitializers = [];
    var _longueur_decorators;
    var _longueur_initializers = [];
    var _longueur_extraInitializers = [];
    var _epaisseur_decorators;
    var _epaisseur_initializers = [];
    var _epaisseur_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProductDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.stock = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _stock_initializers, void 0));
                this.imageUrl = (__runInitializers(this, _stock_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
                this.categoryId = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
                this.isActive = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                // ── Dimensions tapis ──────────────────────────────────────────────────────
                this.largeur = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _largeur_initializers, void 0));
                this.longueur = (__runInitializers(this, _largeur_extraInitializers), __runInitializers(this, _longueur_initializers, void 0));
                this.epaisseur = (__runInitializers(this, _longueur_extraInitializers), __runInitializers(this, _epaisseur_initializers, void 0));
                __runInitializers(this, _epaisseur_extraInitializers);
            }
            return CreateProductDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)()];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _price_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _stock_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_transformer_1.Type)(function () { return Number; })];
            _imageUrl_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _categoryId_decorators = [(0, class_validator_1.IsUUID)()];
            _isActive_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _largeur_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _longueur_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _epaisseur_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _stock_decorators, { kind: "field", name: "stock", static: false, private: false, access: { has: function (obj) { return "stock" in obj; }, get: function (obj) { return obj.stock; }, set: function (obj, value) { obj.stock = value; } }, metadata: _metadata }, _stock_initializers, _stock_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: function (obj) { return "imageUrl" in obj; }, get: function (obj) { return obj.imageUrl; }, set: function (obj, value) { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _largeur_decorators, { kind: "field", name: "largeur", static: false, private: false, access: { has: function (obj) { return "largeur" in obj; }, get: function (obj) { return obj.largeur; }, set: function (obj, value) { obj.largeur = value; } }, metadata: _metadata }, _largeur_initializers, _largeur_extraInitializers);
            __esDecorate(null, null, _longueur_decorators, { kind: "field", name: "longueur", static: false, private: false, access: { has: function (obj) { return "longueur" in obj; }, get: function (obj) { return obj.longueur; }, set: function (obj, value) { obj.longueur = value; } }, metadata: _metadata }, _longueur_initializers, _longueur_extraInitializers);
            __esDecorate(null, null, _epaisseur_decorators, { kind: "field", name: "epaisseur", static: false, private: false, access: { has: function (obj) { return "epaisseur" in obj; }, get: function (obj) { return obj.epaisseur; }, set: function (obj, value) { obj.epaisseur = value; } }, metadata: _metadata }, _epaisseur_initializers, _epaisseur_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProductDto = CreateProductDto;
var UpdateProductDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _stock_decorators;
    var _stock_initializers = [];
    var _stock_extraInitializers = [];
    var _imageUrl_decorators;
    var _imageUrl_initializers = [];
    var _imageUrl_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _largeur_decorators;
    var _largeur_initializers = [];
    var _largeur_extraInitializers = [];
    var _longueur_decorators;
    var _longueur_initializers = [];
    var _longueur_extraInitializers = [];
    var _epaisseur_decorators;
    var _epaisseur_initializers = [];
    var _epaisseur_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateProductDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.stock = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _stock_initializers, void 0));
                this.imageUrl = (__runInitializers(this, _stock_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
                this.categoryId = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
                this.isActive = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                // ── Dimensions tapis ──────────────────────────────────────────────────────
                this.largeur = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _largeur_initializers, void 0));
                this.longueur = (__runInitializers(this, _largeur_extraInitializers), __runInitializers(this, _longueur_initializers, void 0));
                this.epaisseur = (__runInitializers(this, _longueur_extraInitializers), __runInitializers(this, _epaisseur_initializers, void 0));
                __runInitializers(this, _epaisseur_extraInitializers);
            }
            return UpdateProductDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _price_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _stock_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_transformer_1.Type)(function () { return Number; })];
            _imageUrl_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _categoryId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _isActive_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _largeur_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _longueur_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _epaisseur_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _stock_decorators, { kind: "field", name: "stock", static: false, private: false, access: { has: function (obj) { return "stock" in obj; }, get: function (obj) { return obj.stock; }, set: function (obj, value) { obj.stock = value; } }, metadata: _metadata }, _stock_initializers, _stock_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: function (obj) { return "imageUrl" in obj; }, get: function (obj) { return obj.imageUrl; }, set: function (obj, value) { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _largeur_decorators, { kind: "field", name: "largeur", static: false, private: false, access: { has: function (obj) { return "largeur" in obj; }, get: function (obj) { return obj.largeur; }, set: function (obj, value) { obj.largeur = value; } }, metadata: _metadata }, _largeur_initializers, _largeur_extraInitializers);
            __esDecorate(null, null, _longueur_decorators, { kind: "field", name: "longueur", static: false, private: false, access: { has: function (obj) { return "longueur" in obj; }, get: function (obj) { return obj.longueur; }, set: function (obj, value) { obj.longueur = value; } }, metadata: _metadata }, _longueur_initializers, _longueur_extraInitializers);
            __esDecorate(null, null, _epaisseur_decorators, { kind: "field", name: "epaisseur", static: false, private: false, access: { has: function (obj) { return "epaisseur" in obj; }, get: function (obj) { return obj.epaisseur; }, set: function (obj, value) { obj.epaisseur = value; } }, metadata: _metadata }, _epaisseur_initializers, _epaisseur_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateProductDto = UpdateProductDto;
