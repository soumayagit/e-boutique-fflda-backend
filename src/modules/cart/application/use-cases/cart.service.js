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
exports.CartService = void 0;
var common_1 = require("@nestjs/common");
var ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
var CartService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CartService = _classThis = /** @class */ (function () {
        function CartService_1(prisma) {
            this.prisma = prisma;
        }
        CartService_1.prototype.getOrCreateCart = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.cart.findUnique({
                                where: { userId: userId },
                                include: {
                                    items: {
                                        include: {
                                            product: {
                                                select: {
                                                    id: true, name: true, price: true,
                                                    imageUrl: true, stock: true, isActive: true,
                                                },
                                            },
                                            variant: {
                                                select: { id: true, size: true, stock: true },
                                            },
                                        },
                                        orderBy: { createdAt: 'asc' },
                                    },
                                },
                            })];
                        case 1:
                            cart = _a.sent();
                            if (!!cart) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.cart.create({
                                    data: {
                                        userId: userId,
                                        expiresAt: new Date(Date.now() + ONE_MONTH),
                                    },
                                    include: {
                                        items: {
                                            include: {
                                                product: {
                                                    select: {
                                                        id: true, name: true, price: true,
                                                        imageUrl: true, stock: true, isActive: true,
                                                    },
                                                },
                                                variant: {
                                                    select: { id: true, size: true, stock: true },
                                                },
                                            },
                                        },
                                    },
                                })];
                        case 2:
                            cart = _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!(cart.expiresAt < new Date())) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.cart.update({
                                    where: { id: cart.id },
                                    data: { expiresAt: new Date(Date.now() + ONE_MONTH) },
                                })];
                        case 5:
                            _a.sent();
                            cart.items = [];
                            _a.label = 6;
                        case 6: return [2 /*return*/, this.formatCart(cart)];
                    }
                });
            });
        };
        CartService_1.prototype.addItem = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var product, variant, cart, isTapis, existingItem;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.product.findUnique({
                                where: { id: dto.productId },
                            })];
                        case 1:
                            product = _b.sent();
                            if (!product || !product.isActive) {
                                throw new common_1.NotFoundException('Produit introuvable ou inactif');
                            }
                            if (!dto.variantId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.productVariant.findUnique({
                                    where: { id: dto.variantId },
                                })];
                        case 2:
                            variant = _b.sent();
                            if (!variant)
                                throw new common_1.NotFoundException('Taille introuvable');
                            if (variant.stock < dto.quantity) {
                                throw new common_1.BadRequestException("Stock insuffisant pour cette taille (".concat(variant.stock, " disponibles)"));
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            if (product.stock < dto.quantity) {
                                throw new common_1.BadRequestException("Stock insuffisant (".concat(product.stock, " disponibles)"));
                            }
                            _b.label = 4;
                        case 4: return [4 /*yield*/, this.prisma.cart.findUnique({ where: { userId: userId } })];
                        case 5:
                            cart = _b.sent();
                            if (!!cart) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.prisma.cart.create({
                                    data: {
                                        userId: userId,
                                        expiresAt: new Date(Date.now() + ONE_MONTH),
                                    },
                                })];
                        case 6:
                            cart = _b.sent();
                            return [3 /*break*/, 9];
                        case 7: return [4 /*yield*/, this.prisma.cart.update({
                                where: { id: cart.id },
                                data: { expiresAt: new Date(Date.now() + ONE_MONTH) },
                            })];
                        case 8:
                            _b.sent();
                            _b.label = 9;
                        case 9:
                            isTapis = dto.longueur != null || dto.largeur != null ||
                                dto.epaisseur != null || dto.planFileUrl != null;
                            if (!isTapis) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.prisma.cartItem.create({
                                    data: {
                                        cartId: cart.id,
                                        productId: dto.productId,
                                        variantId: dto.variantId,
                                        quantity: dto.quantity,
                                        longueur: dto.longueur,
                                        largeur: dto.largeur,
                                        epaisseur: dto.epaisseur,
                                        planFileUrl: dto.planFileUrl,
                                    },
                                })];
                        case 10:
                            _b.sent();
                            return [3 /*break*/, 16];
                        case 11: return [4 /*yield*/, this.prisma.cartItem.findFirst({
                                where: {
                                    cartId: cart.id,
                                    productId: dto.productId,
                                    variantId: (_a = dto.variantId) !== null && _a !== void 0 ? _a : null,
                                },
                            })];
                        case 12:
                            existingItem = _b.sent();
                            if (!existingItem) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.prisma.cartItem.update({
                                    where: { id: existingItem.id },
                                    data: { quantity: existingItem.quantity + dto.quantity },
                                })];
                        case 13:
                            _b.sent();
                            return [3 /*break*/, 16];
                        case 14: return [4 /*yield*/, this.prisma.cartItem.create({
                                data: {
                                    cartId: cart.id,
                                    productId: dto.productId,
                                    variantId: dto.variantId,
                                    quantity: dto.quantity,
                                },
                            })];
                        case 15:
                            _b.sent();
                            _b.label = 16;
                        case 16: return [2 /*return*/, this.getOrCreateCart(userId)];
                    }
                });
            });
        };
        CartService_1.prototype.updateItem = function (userId, itemId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var cart, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.cart.findUnique({ where: { userId: userId } })];
                        case 1:
                            cart = _a.sent();
                            if (!cart)
                                throw new common_1.NotFoundException('Panier introuvable');
                            return [4 /*yield*/, this.prisma.cartItem.findFirst({
                                    where: { id: itemId, cartId: cart.id },
                                })];
                        case 2:
                            item = _a.sent();
                            if (!item)
                                throw new common_1.NotFoundException('Article introuvable dans le panier');
                            return [4 /*yield*/, this.prisma.cartItem.update({
                                    where: { id: itemId },
                                    data: { quantity: dto.quantity },
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, this.getOrCreateCart(userId)];
                    }
                });
            });
        };
        CartService_1.prototype.removeItem = function (userId, itemId) {
            return __awaiter(this, void 0, void 0, function () {
                var cart, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.cart.findUnique({ where: { userId: userId } })];
                        case 1:
                            cart = _a.sent();
                            if (!cart)
                                throw new common_1.NotFoundException('Panier introuvable');
                            return [4 /*yield*/, this.prisma.cartItem.findFirst({
                                    where: { id: itemId, cartId: cart.id },
                                })];
                        case 2:
                            item = _a.sent();
                            if (!item)
                                throw new common_1.NotFoundException('Article introuvable dans le panier');
                            return [4 /*yield*/, this.prisma.cartItem.delete({ where: { id: itemId } })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, this.getOrCreateCart(userId)];
                    }
                });
            });
        };
        CartService_1.prototype.clearCart = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.cart.findUnique({ where: { userId: userId } })];
                        case 1:
                            cart = _a.sent();
                            if (!cart)
                                throw new common_1.NotFoundException('Panier introuvable');
                            return [4 /*yield*/, this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.getOrCreateCart(userId)];
                    }
                });
            });
        };
        CartService_1.prototype.formatCart = function (cart) {
            var items = cart.items.map(function (item) {
                var _a, _b, _c, _d;
                return ({
                    id: item.id,
                    quantity: item.quantity,
                    product: {
                        id: item.product.id,
                        name: item.product.name,
                        price: Number(item.product.price),
                        imageUrl: item.product.imageUrl,
                        stock: item.product.stock,
                    },
                    variant: item.variant
                        ? { id: item.variant.id, size: item.variant.size, stock: item.variant.stock }
                        : null,
                    // ── US338 dimensions tapis ────────────────────────────────
                    longueur: (_a = item.longueur) !== null && _a !== void 0 ? _a : null,
                    largeur: (_b = item.largeur) !== null && _b !== void 0 ? _b : null,
                    epaisseur: (_c = item.epaisseur) !== null && _c !== void 0 ? _c : null,
                    planFileUrl: (_d = item.planFileUrl) !== null && _d !== void 0 ? _d : null,
                    subtotal: Number(item.product.price) * item.quantity,
                });
            });
            var total = items.reduce(function (sum, i) { return sum + i.subtotal; }, 0);
            return {
                id: cart.id,
                itemCount: items.reduce(function (sum, i) { return sum + i.quantity; }, 0),
                items: items,
                total: Math.round(total * 100) / 100,
                shippingCost: items.length > 0 ? 4.90 : 0,
                totalWithShipping: items.length > 0
                    ? Math.round((total + 4.90) * 100) / 100
                    : 0,
            };
        };
        return CartService_1;
    }());
    __setFunctionName(_classThis, "CartService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CartService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CartService = _classThis;
}();
exports.CartService = CartService;
