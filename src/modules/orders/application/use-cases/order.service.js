"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.OrderService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var OrderService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrderService = _classThis = /** @class */ (function () {
        function OrderService_1(prisma, mailService) {
            this.prisma = prisma;
            this.mailService = mailService;
            this.TVA_RATE = 0.20;
            this.SHIPPING_HT = 4.08;
        }
        OrderService_1.prototype.createOrder = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var cart, _i, _a, item, subtotal, shippingTVA, shippingCost, total, paymentMethod, paymentStatus, requiresValidation, initialStatus, order, formatted, user, mailError_1, mailError_2;
                var _this = this;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.prisma.cart.findUnique({
                                where: { userId: userId },
                                include: {
                                    items: {
                                        include: { product: true, variant: true },
                                    },
                                },
                            })];
                        case 1:
                            cart = _e.sent();
                            if (!cart || cart.items.length === 0) {
                                throw new common_1.BadRequestException('Le panier est vide');
                            }
                            for (_i = 0, _a = cart.items; _i < _a.length; _i++) {
                                item = _a[_i];
                                if (item.variantId && item.variant) {
                                    if (item.variant.stock < item.quantity) {
                                        throw new common_1.BadRequestException("Stock insuffisant pour ".concat(item.product.name, " (taille ").concat(item.variant.size, ")"));
                                    }
                                }
                                else {
                                    if (item.product.stock < item.quantity) {
                                        throw new common_1.BadRequestException("Stock insuffisant pour ".concat(item.product.name));
                                    }
                                }
                            }
                            subtotal = cart.items.reduce(function (sum, i) { return sum + Number(i.product.price) * i.quantity; }, 0);
                            shippingTVA = Math.round(this.SHIPPING_HT * this.TVA_RATE * 100) / 100;
                            shippingCost = Math.round((this.SHIPPING_HT + shippingTVA) * 100) / 100;
                            total = Math.round((subtotal + shippingCost) * 100) / 100;
                            paymentMethod = ((_b = dto.paymentMethod) !== null && _b !== void 0 ? _b : 'card');
                            paymentStatus = this._getPaymentStatus((_c = dto.paymentMethod) !== null && _c !== void 0 ? _c : 'card');
                            requiresValidation = cart.items.some(function (item) {
                                return item.longueur != null ||
                                    item.largeur != null ||
                                    item.epaisseur != null ||
                                    item.planFileUrl != null;
                            });
                            initialStatus = requiresValidation ? 'AWAITING_ADMIN_REVIEW' : 'PENDING';
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var newOrder, _i, _a, item;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, tx.order.create({
                                                    data: {
                                                        userId: userId,
                                                        status: initialStatus,
                                                        requiresValidation: requiresValidation,
                                                        firstName: dto.firstName,
                                                        lastName: dto.lastName,
                                                        address: dto.address,
                                                        city: dto.city,
                                                        postalCode: dto.postalCode,
                                                        phone: dto.phone,
                                                        notes: dto.notes,
                                                        paymentMethod: paymentMethod,
                                                        paymentStatus: paymentStatus,
                                                        total: total,
                                                        shippingCost: shippingCost,
                                                        items: {
                                                            create: cart.items.map(function (item) {
                                                                var _a, _b;
                                                                return ({
                                                                    productId: item.productId,
                                                                    variantId: item.variantId,
                                                                    productName: item.product.name,
                                                                    size: (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : null,
                                                                    price: Number(item.product.price),
                                                                    quantity: item.quantity,
                                                                    subtotal: Math.round(Number(item.product.price) * item.quantity * 100) / 100,
                                                                    // ── report des infos tapis vers OrderItem ──
                                                                    longueur: item.longueur,
                                                                    largeur: item.largeur,
                                                                    epaisseur: item.epaisseur,
                                                                    planFileUrl: item.planFileUrl,
                                                                });
                                                            }),
                                                        },
                                                    },
                                                    include: { items: true },
                                                })];
                                            case 1:
                                                newOrder = _b.sent();
                                                _i = 0, _a = cart.items;
                                                _b.label = 2;
                                            case 2:
                                                if (!(_i < _a.length)) return [3 /*break*/, 7];
                                                item = _a[_i];
                                                if (!item.variantId) return [3 /*break*/, 4];
                                                return [4 /*yield*/, tx.productVariant.update({
                                                        where: { id: item.variantId },
                                                        data: { stock: { decrement: item.quantity } },
                                                    })];
                                            case 3:
                                                _b.sent();
                                                return [3 /*break*/, 6];
                                            case 4: return [4 /*yield*/, tx.product.update({
                                                    where: { id: item.productId },
                                                    data: { stock: { decrement: item.quantity } },
                                                })];
                                            case 5:
                                                _b.sent();
                                                _b.label = 6;
                                            case 6:
                                                _i++;
                                                return [3 /*break*/, 2];
                                            case 7: return [4 /*yield*/, tx.cartItem.deleteMany({ where: { cartId: cart.id } })];
                                            case 8:
                                                _b.sent();
                                                return [2 /*return*/, newOrder];
                                        }
                                    });
                                }); })];
                        case 2:
                            order = _e.sent();
                            formatted = this.formatOrder(order);
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: { email: true },
                                })];
                        case 3:
                            user = _e.sent();
                            if (!((user === null || user === void 0 ? void 0 : user.email) && paymentMethod === 'cod' && !requiresValidation)) return [3 /*break*/, 8];
                            _e.label = 4;
                        case 4:
                            _e.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.mailService.sendOrderConfirmation(user.email, (_d = dto.firstName) !== null && _d !== void 0 ? _d : 'Client', order.id, formatted.items.map(function (i) { return ({
                                    name: i.productName,
                                    quantity: i.quantity,
                                    price: i.price,
                                }); }), formatted.total)];
                        case 5:
                            _e.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            mailError_1 = _e.sent();
                            console.warn('Email client non envoyé:', mailError_1.message);
                            return [3 /*break*/, 7];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            if (requiresValidation) {
                                console.log("\u2139\uFE0F Commande ".concat(order.id, " en attente de validation admin"));
                            }
                            _e.label = 9;
                        case 9:
                            _e.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, this._notifyAdminsNewOrder(order.id, formatted, requiresValidation)];
                        case 10:
                            _e.sent();
                            return [3 /*break*/, 12];
                        case 11:
                            mailError_2 = _e.sent();
                            console.warn('Email admin non envoyé:', mailError_2.message);
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/, formatted];
                    }
                });
            });
        };
        // ── Notifie tous les admins qu'une nouvelle commande a été passée ──
        OrderService_1.prototype._notifyAdminsNewOrder = function (orderId, formatted, requiresValidation) {
            return __awaiter(this, void 0, void 0, function () {
                var admins, _i, admins_1, admin, err_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findMany({
                                where: {
                                    role: { in: ['ADMIN', 'SUPER_ADMIN', 'MANAGER'] },
                                    isActive: true,
                                },
                                select: { email: true, firstName: true },
                            })];
                        case 1:
                            admins = _b.sent();
                            if (admins.length === 0) {
                                console.warn('⚠️ Aucun admin actif trouvé en base — aucun email de notification envoyé');
                                return [2 /*return*/];
                            }
                            _i = 0, admins_1 = admins;
                            _b.label = 2;
                        case 2:
                            if (!(_i < admins_1.length)) return [3 /*break*/, 7];
                            admin = admins_1[_i];
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.mailService.sendAdminNewOrder(admin.email, (_a = admin.firstName) !== null && _a !== void 0 ? _a : 'Admin', orderId, formatted.total, requiresValidation)];
                        case 4:
                            _b.sent();
                            console.log("\u2705 Email admin envoy\u00E9 \u00E0 ".concat(admin.email));
                            return [3 /*break*/, 6];
                        case 5:
                            err_1 = _b.sent();
                            console.warn("\u26A0\uFE0F Email admin non envoy\u00E9 \u00E0 ".concat(admin.email, ":"), err_1.message);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        // ── Détermine le statut selon la méthode de paiement ──
        OrderService_1.prototype._getPaymentStatus = function (paymentMethod) {
            switch (paymentMethod) {
                case 'cod': return client_1.PaymentStatus.PENDING;
                case 'paypal': return client_1.PaymentStatus.SIMULATED;
                case 'card': return client_1.PaymentStatus.SIMULATED;
                default: return client_1.PaymentStatus.SIMULATED;
            }
        };
        OrderService_1.prototype.getUserOrders = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var orders;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.findMany({
                                where: { userId: userId },
                                include: { items: true },
                                orderBy: { createdAt: 'desc' },
                            })];
                        case 1:
                            orders = _a.sent();
                            return [2 /*return*/, orders.map(function (o) { return _this.formatOrder(o); })];
                    }
                });
            });
        };
        // ── Confirme le paiement et envoie l'email (Stripe/PayPal) ──
        // ── Confirme le paiement et envoie l'email (Stripe/PayPal) ──
        OrderService_1.prototype.confirmPaymentAndNotify = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, updatedOrder, email, firstName, formatted, mailError_3;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.findUnique({
                                where: { id: orderId },
                                include: { items: true, user: true },
                            })];
                        case 1:
                            order = _c.sent();
                            if (!order) {
                                console.warn("\u26A0\uFE0F Commande ".concat(orderId, " introuvable pour confirmation paiement"));
                                return [2 /*return*/];
                            }
                            // ── Garde-fou : refuse le paiement tant que l'admin n'a pas validé ──
                            if (order.requiresValidation && order.status !== 'AWAITING_PAYMENT') {
                                throw new common_1.BadRequestException('Cette commande sur-mesure doit être validée par un administrateur avant paiement');
                            }
                            return [4 /*yield*/, this.prisma.order.update({
                                    where: { id: orderId },
                                    data: { paymentStatus: 'PAID', status: 'CONFIRMED' },
                                    include: { items: true, user: true },
                                })];
                        case 2:
                            updatedOrder = _c.sent();
                            email = (_a = updatedOrder.user) === null || _a === void 0 ? void 0 : _a.email;
                            firstName = (_b = updatedOrder.firstName) !== null && _b !== void 0 ? _b : 'Client';
                            if (!email) return [3 /*break*/, 6];
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            formatted = this.formatOrder(updatedOrder);
                            return [4 /*yield*/, this.mailService.sendOrderConfirmation(email, firstName, updatedOrder.id, formatted.items.map(function (i) { return ({
                                    name: i.productName,
                                    quantity: i.quantity,
                                    price: i.price,
                                }); }), formatted.total)];
                        case 4:
                            _c.sent();
                            console.log("\u2705 Email confirmation paiement envoy\u00E9 \u00E0 ".concat(email));
                            return [3 /*break*/, 6];
                        case 5:
                            mailError_3 = _c.sent();
                            console.warn('⚠️ Email confirmation paiement non envoyé:', mailError_3.message);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, this.formatOrder(updatedOrder)];
                    }
                });
            });
        };
        OrderService_1.prototype.getOrderById = function (userId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.findFirst({
                                where: { id: orderId, userId: userId },
                                include: { items: true },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Commande introuvable');
                            return [2 /*return*/, this.formatOrder(order)];
                    }
                });
            });
        };
        OrderService_1.prototype.getAllOrders = function () {
            return __awaiter(this, void 0, void 0, function () {
                var orders;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.findMany({
                                include: {
                                    items: true,
                                    user: { select: { firstName: true, lastName: true, email: true } },
                                },
                                orderBy: { createdAt: 'desc' },
                            })];
                        case 1:
                            orders = _a.sent();
                            return [2 /*return*/, orders.map(function (o) { return _this.formatOrder(o); })];
                    }
                });
            });
        };
        OrderService_1.prototype.updateStatus = function (orderId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var order, email, firstName, _a, mailError_4;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.update({
                                where: { id: orderId },
                                data: { status: status },
                                include: { items: true, user: true },
                            })];
                        case 1:
                            order = _d.sent();
                            email = (_b = order.user) === null || _b === void 0 ? void 0 : _b.email;
                            firstName = (_c = order.firstName) !== null && _c !== void 0 ? _c : 'Client';
                            if (!email) return [3 /*break*/, 13];
                            _d.label = 2;
                        case 2:
                            _d.trys.push([2, 12, , 13]);
                            _a = status;
                            switch (_a) {
                                case 'CONFIRMED': return [3 /*break*/, 3];
                                case 'SHIPPED': return [3 /*break*/, 5];
                                case 'DELIVERED': return [3 /*break*/, 7];
                                case 'CANCELLED': return [3 /*break*/, 9];
                            }
                            return [3 /*break*/, 11];
                        case 3: return [4 /*yield*/, this.mailService.sendOrderStatusConfirmed(email, firstName, order.id)];
                        case 4:
                            _d.sent();
                            return [3 /*break*/, 11];
                        case 5: return [4 /*yield*/, this.mailService.sendOrderShipped(email, firstName, order.id)];
                        case 6:
                            _d.sent();
                            return [3 /*break*/, 11];
                        case 7: return [4 /*yield*/, this.mailService.sendOrderDelivered(email, firstName, order.id)];
                        case 8:
                            _d.sent();
                            return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, this.mailService.sendOrderCancelled(email, firstName, order.id)];
                        case 10:
                            _d.sent();
                            return [3 /*break*/, 11];
                        case 11:
                            console.log("\u2705 Email statut ".concat(status, " envoy\u00E9 \u00E0 ").concat(email));
                            return [3 /*break*/, 13];
                        case 12:
                            mailError_4 = _d.sent();
                            console.warn('⚠️ Email non envoyé:', mailError_4.message);
                            return [3 /*break*/, 13];
                        case 13: return [2 /*return*/, this.formatOrder(order)];
                    }
                });
            });
        };
        // ── Admin : valide/chiffre une commande sur-mesure ──
        OrderService_1.prototype.validateOrder = function (orderId, adminUserId, finalTotal) {
            return __awaiter(this, void 0, void 0, function () {
                var order, updated, email;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.findUnique({ where: { id: orderId } })];
                        case 1:
                            order = _b.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Commande introuvable');
                            if (!order.requiresValidation) {
                                throw new common_1.BadRequestException('Cette commande ne nécessite pas de validation');
                            }
                            if (order.status !== 'AWAITING_ADMIN_REVIEW') {
                                throw new common_1.BadRequestException('Cette commande a déjà été traitée');
                            }
                            return [4 /*yield*/, this.prisma.order.update({
                                    where: { id: orderId },
                                    data: __assign({ status: 'AWAITING_PAYMENT', validatedAt: new Date(), validatedBy: adminUserId }, (finalTotal != null ? { total: finalTotal } : {})),
                                    include: { items: true, user: true },
                                })];
                        case 2:
                            updated = _b.sent();
                            email = (_a = updated.user) === null || _a === void 0 ? void 0 : _a.email;
                            if (email) {
                                try {
                                    // TODO: créer sendOrderValidated dans MailService — email avec lien
                                    // vers /payment pour cette commande précise, prix final inclus
                                    console.log("\u2705 Commande ".concat(orderId, " valid\u00E9e, en attente de paiement"));
                                }
                                catch (mailError) {
                                    console.warn('⚠️ Email non envoyé:', mailError.message);
                                }
                            }
                            return [2 /*return*/, this.formatOrder(updated)];
                    }
                });
            });
        };
        // ── Nouveau : mettre à jour le statut de paiement ──
        OrderService_1.prototype.updatePaymentStatus = function (orderId, paymentStatus) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.update({
                                where: { id: orderId },
                                data: { paymentStatus: paymentStatus },
                                include: { items: true },
                            })];
                        case 1:
                            order = _a.sent();
                            return [2 /*return*/, this.formatOrder(order)];
                    }
                });
            });
        };
        OrderService_1.prototype.deleteOrder = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.order.findUnique({
                                where: { id: orderId },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Commande introuvable');
                            return [4 /*yield*/, this.prisma.order.delete({ where: { id: orderId } })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OrderService_1.prototype.formatOrder = function (order) {
            var _a, _b, _c;
            var tva = this.TVA_RATE;
            var total = Number(order.total);
            var shipping = Number(order.shippingCost);
            var subtotal = Math.round((total - shipping) * 100) / 100;
            var subtotalHT = Math.round((subtotal / (1 + tva)) * 100) / 100;
            var subtotalTVA = Math.round((subtotal - subtotalHT) * 100) / 100;
            var shippingHT = Math.round((shipping / (1 + tva)) * 100) / 100;
            var shippingTVA = Math.round((shipping - shippingHT) * 100) / 100;
            var totalHT = Math.round((subtotalHT + shippingHT) * 100) / 100;
            var totalTVA = Math.round((subtotalTVA + shippingTVA) * 100) / 100;
            return {
                id: order.id,
                status: order.status,
                paymentMethod: (_a = order.paymentMethod) !== null && _a !== void 0 ? _a : 'card',
                paymentStatus: (_b = order.paymentStatus) !== null && _b !== void 0 ? _b : 'SIMULATED',
                total: total,
                subtotal: subtotal,
                shippingCost: shipping,
                totalHT: totalHT,
                subtotalHT: subtotalHT,
                shippingHT: shippingHT,
                totalTVA: totalTVA,
                subtotalTVA: subtotalTVA,
                shippingTVA: shippingTVA,
                tvaRate: tva * 100,
                address: {
                    firstName: order.firstName,
                    lastName: order.lastName,
                    address: order.address,
                    city: order.city,
                    postalCode: order.postalCode,
                    phone: order.phone,
                },
                notes: order.notes,
                createdAt: order.createdAt,
                items: order.items.map(function (item) { return ({
                    id: item.id,
                    productName: item.productName,
                    size: item.size,
                    price: Number(item.price),
                    priceHT: Math.round((Number(item.price) / (1 + tva)) * 100) / 100,
                    quantity: item.quantity,
                    subtotal: Number(item.subtotal),
                    subtotalHT: Math.round((Number(item.subtotal) / (1 + tva)) * 100) / 100,
                    tva: Math.round((Number(item.subtotal) - (Number(item.subtotal) / (1 + tva))) * 100) / 100,
                }); }),
                user: (_c = order.user) !== null && _c !== void 0 ? _c : null,
            };
        };
        return OrderService_1;
    }());
    __setFunctionName(_classThis, "OrderService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderService = _classThis;
}();
exports.OrderService = OrderService;
