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
exports.ApplyPromoDto = exports.CreatePromoDto = exports.DiscountType = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "PERCENTAGE";
    DiscountType["FIXED"] = "FIXED";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var CreatePromoDto = function () {
    var _a;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _discountType_decorators;
    var _discountType_initializers = [];
    var _discountType_extraInitializers = [];
    var _discountValue_decorators;
    var _discountValue_initializers = [];
    var _discountValue_extraInitializers = [];
    var _minOrderAmount_decorators;
    var _minOrderAmount_initializers = [];
    var _minOrderAmount_extraInitializers = [];
    var _maxUses_decorators;
    var _maxUses_initializers = [];
    var _maxUses_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePromoDto() {
                this.code = __runInitializers(this, _code_initializers, void 0);
                this.discountType = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _discountType_initializers, void 0));
                this.discountValue = (__runInitializers(this, _discountType_extraInitializers), __runInitializers(this, _discountValue_initializers, void 0));
                this.minOrderAmount = (__runInitializers(this, _discountValue_extraInitializers), __runInitializers(this, _minOrderAmount_initializers, void 0));
                this.maxUses = (__runInitializers(this, _minOrderAmount_extraInitializers), __runInitializers(this, _maxUses_initializers, void 0));
                this.isActive = (__runInitializers(this, _maxUses_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                this.expiresAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
                __runInitializers(this, _expiresAt_extraInitializers);
            }
            return CreatePromoDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _code_decorators = [(0, swagger_1.ApiProperty)({ example: 'FFLDA2026' }), (0, class_validator_1.IsString)()];
            _discountType_decorators = [(0, swagger_1.ApiProperty)({ enum: DiscountType, default: DiscountType.PERCENTAGE }), (0, class_validator_1.IsEnum)(DiscountType), (0, class_validator_1.IsOptional)()];
            _discountValue_decorators = [(0, swagger_1.ApiProperty)({ example: 10 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _minOrderAmount_decorators = [(0, swagger_1.ApiProperty)({ example: 0, required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _maxUses_decorators = [(0, swagger_1.ApiProperty)({ example: 100, required: false }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _isActive_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _expiresAt_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            __esDecorate(null, null, _discountType_decorators, { kind: "field", name: "discountType", static: false, private: false, access: { has: function (obj) { return "discountType" in obj; }, get: function (obj) { return obj.discountType; }, set: function (obj, value) { obj.discountType = value; } }, metadata: _metadata }, _discountType_initializers, _discountType_extraInitializers);
            __esDecorate(null, null, _discountValue_decorators, { kind: "field", name: "discountValue", static: false, private: false, access: { has: function (obj) { return "discountValue" in obj; }, get: function (obj) { return obj.discountValue; }, set: function (obj, value) { obj.discountValue = value; } }, metadata: _metadata }, _discountValue_initializers, _discountValue_extraInitializers);
            __esDecorate(null, null, _minOrderAmount_decorators, { kind: "field", name: "minOrderAmount", static: false, private: false, access: { has: function (obj) { return "minOrderAmount" in obj; }, get: function (obj) { return obj.minOrderAmount; }, set: function (obj, value) { obj.minOrderAmount = value; } }, metadata: _metadata }, _minOrderAmount_initializers, _minOrderAmount_extraInitializers);
            __esDecorate(null, null, _maxUses_decorators, { kind: "field", name: "maxUses", static: false, private: false, access: { has: function (obj) { return "maxUses" in obj; }, get: function (obj) { return obj.maxUses; }, set: function (obj, value) { obj.maxUses = value; } }, metadata: _metadata }, _maxUses_initializers, _maxUses_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePromoDto = CreatePromoDto;
var ApplyPromoDto = function () {
    var _a;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _orderAmount_decorators;
    var _orderAmount_initializers = [];
    var _orderAmount_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ApplyPromoDto() {
                this.code = __runInitializers(this, _code_initializers, void 0);
                this.orderAmount = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _orderAmount_initializers, void 0));
                __runInitializers(this, _orderAmount_extraInitializers);
            }
            return ApplyPromoDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _code_decorators = [(0, swagger_1.ApiProperty)({ example: 'FFLDA2026' }), (0, class_validator_1.IsString)()];
            _orderAmount_decorators = [(0, swagger_1.ApiProperty)({ example: 89.90 }), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            __esDecorate(null, null, _orderAmount_decorators, { kind: "field", name: "orderAmount", static: false, private: false, access: { has: function (obj) { return "orderAmount" in obj; }, get: function (obj) { return obj.orderAmount; }, set: function (obj, value) { obj.orderAmount = value; } }, metadata: _metadata }, _orderAmount_initializers, _orderAmount_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ApplyPromoDto = ApplyPromoDto;
