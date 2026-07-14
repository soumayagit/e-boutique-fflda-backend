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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var path_1 = require("path");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/infrastructure/guards/jwt-auth.guard");
var CartController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('cart'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Controller)('cart')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getCart_decorators;
    var _addItem_decorators;
    var _addItemWithPlan_decorators;
    var _updateItem_decorators;
    var _removeItem_decorators;
    var _clearCart_decorators;
    var CartController = _classThis = /** @class */ (function () {
        function CartController_1(cartService) {
            this.cartService = (__runInitializers(this, _instanceExtraInitializers), cartService);
        }
        CartController_1.prototype.getCart = function (req) {
            return this.cartService.getOrCreateCart(req.user.id);
        };
        CartController_1.prototype.addItem = function (req, dto) {
            return this.cartService.addItem(req.user.id, dto);
        };
        // ── US338 : upload plan tapis ─────────────────────────────────
        CartController_1.prototype.addItemWithPlan = function (req, file, body) {
            return __awaiter(this, void 0, void 0, function () {
                var dto;
                return __generator(this, function (_a) {
                    if (!file)
                        throw new Error('Fichier manquant ou vide');
                    dto = {
                        productId: body.productId,
                        quantity: parseInt(body.quantity) || 1,
                        epaisseur: body.epaisseur ? parseFloat(body.epaisseur) : undefined,
                        planFileUrl: "/uploads/plans/".concat(file.filename),
                    };
                    return [2 /*return*/, this.cartService.addItem(req.user.id, dto)];
                });
            });
        };
        CartController_1.prototype.updateItem = function (req, id, dto) {
            return this.cartService.updateItem(req.user.id, id, dto);
        };
        CartController_1.prototype.removeItem = function (req, id) {
            return this.cartService.removeItem(req.user.id, id);
        };
        CartController_1.prototype.clearCart = function (req) {
            return this.cartService.clearCart(req.user.id);
        };
        return CartController_1;
    }());
    __setFunctionName(_classThis, "CartController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getCart_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Récupère le panier' })];
        _addItem_decorators = [(0, common_1.Post)('items'), (0, swagger_1.ApiOperation)({ summary: 'Ajoute un article au panier' })];
        _addItemWithPlan_decorators = [(0, common_1.Post)('items/upload-plan'), (0, swagger_1.ApiOperation)({ summary: 'Upload plan tapis + ajout au panier' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
                schema: {
                    type: 'object',
                    required: ['productId', 'quantity', 'epaisseur', 'file'],
                    properties: {
                        productId: {
                            type: 'string',
                            example: 'uuid-du-produit-tapis',
                            description: 'ID du produit tapis',
                        },
                        quantity: {
                            type: 'integer',
                            example: 1,
                            description: 'Quantité',
                        },
                        epaisseur: {
                            type: 'number',
                            example: 4,
                            description: 'Épaisseur en cm (toujours obligatoire)',
                        },
                        file: {
                            type: 'string',
                            format: 'binary',
                            description: 'Plan de la salle (PDF, PNG, JPEG ou JPG)',
                        },
                    },
                },
            }), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/plans',
                    filename: function (req, file, cb) {
                        var unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, "plan-".concat(unique).concat((0, path_1.extname)(file.originalname)));
                    },
                }),
                fileFilter: function (req, file, cb) {
                    var allowed = ['.pdf', '.png', '.jpg', '.jpeg'];
                    var ext = (0, path_1.extname)(file.originalname).toLowerCase();
                    if (!allowed.includes(ext)) {
                        return cb(new Error('Format non autorisé. PDF, PNG, JPEG ou JPG uniquement.'), false);
                    }
                    cb(null, true);
                },
                limits: { fileSize: 10 * 1024 * 1024 },
            }))];
        _updateItem_decorators = [(0, common_1.Put)('items/:id'), (0, swagger_1.ApiOperation)({ summary: 'Modifie la quantité d\'un article' })];
        _removeItem_decorators = [(0, common_1.Delete)('items/:id'), (0, swagger_1.ApiOperation)({ summary: 'Supprime un article du panier' })];
        _clearCart_decorators = [(0, common_1.Delete)(), (0, swagger_1.ApiOperation)({ summary: 'Vide le panier' })];
        __esDecorate(_classThis, null, _getCart_decorators, { kind: "method", name: "getCart", static: false, private: false, access: { has: function (obj) { return "getCart" in obj; }, get: function (obj) { return obj.getCart; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addItem_decorators, { kind: "method", name: "addItem", static: false, private: false, access: { has: function (obj) { return "addItem" in obj; }, get: function (obj) { return obj.addItem; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addItemWithPlan_decorators, { kind: "method", name: "addItemWithPlan", static: false, private: false, access: { has: function (obj) { return "addItemWithPlan" in obj; }, get: function (obj) { return obj.addItemWithPlan; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateItem_decorators, { kind: "method", name: "updateItem", static: false, private: false, access: { has: function (obj) { return "updateItem" in obj; }, get: function (obj) { return obj.updateItem; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeItem_decorators, { kind: "method", name: "removeItem", static: false, private: false, access: { has: function (obj) { return "removeItem" in obj; }, get: function (obj) { return obj.removeItem; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _clearCart_decorators, { kind: "method", name: "clearCart", static: false, private: false, access: { has: function (obj) { return "clearCart" in obj; }, get: function (obj) { return obj.clearCart; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CartController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CartController = _classThis;
}();
exports.CartController = CartController;
