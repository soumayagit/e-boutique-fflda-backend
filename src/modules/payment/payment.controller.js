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
exports.PaymentController = void 0;
var common_1 = require("@nestjs/common");
var public_decorator_1 = require("../auth/infrastructure/decorators/public.decorator");
var swagger_1 = require("@nestjs/swagger");
var PaymentController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Payment'), (0, common_1.Controller)('payment')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createIntent_decorators;
    var _handleWebhook_decorators;
    var _createPaypalOrder_decorators;
    var _capturePaypalOrder_decorators;
    var _createCheckoutSession_decorators;
    var PaymentController = _classThis = /** @class */ (function () {
        function PaymentController_1(paymentService, stripeService, orderService) {
            this.paymentService = (__runInitializers(this, _instanceExtraInitializers), paymentService);
            this.stripeService = stripeService;
            this.orderService = orderService;
        }
        // ── Stripe ────────────────────────────────────────────────────────────────
        PaymentController_1.prototype.createIntent = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.paymentService.createIntent(dto)];
                });
            });
        };
        PaymentController_1.prototype.handleWebhook = function (req, signature) {
            return __awaiter(this, void 0, void 0, function () {
                var rawBody, event, _a, session, orderId, intent, orderId;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            rawBody = req.rawBody;
                            if (!rawBody) {
                                throw new Error('Raw body manquant');
                            }
                            event = this.stripeService.constructWebhookEvent(rawBody, signature);
                            _a = event.type;
                            switch (_a) {
                                case 'checkout.session.completed': return [3 /*break*/, 1];
                                case 'payment_intent.succeeded': return [3 /*break*/, 4];
                                case 'payment_intent.payment_failed': return [3 /*break*/, 7];
                            }
                            return [3 /*break*/, 8];
                        case 1:
                            session = event.data.object;
                            orderId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.orderId;
                            console.log('✅ Checkout Stripe complété:', orderId);
                            if (!orderId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.orderService.confirmPaymentAndNotify(orderId)];
                        case 2:
                            _d.sent();
                            _d.label = 3;
                        case 3: return [3 /*break*/, 9];
                        case 4:
                            intent = event.data.object;
                            orderId = (_c = intent.metadata) === null || _c === void 0 ? void 0 : _c.orderId;
                            console.log('✅ Paiement Stripe réussi:', orderId);
                            if (!orderId) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.orderService.confirmPaymentAndNotify(orderId)];
                        case 5:
                            _d.sent();
                            _d.label = 6;
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            console.log('❌ Paiement Stripe échoué:', event.data.object);
                            return [3 /*break*/, 9];
                        case 8:
                            console.log("\u00C9v\u00E9nement non g\u00E9r\u00E9: ".concat(event.type));
                            _d.label = 9;
                        case 9: return [2 /*return*/, { received: true }];
                    }
                });
            });
        };
        // ── PayPal ────────────────────────────────────────────────────────────────
        PaymentController_1.prototype.createPaypalOrder = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.paymentService.createPaypalOrder(dto)];
                });
            });
        };
        PaymentController_1.prototype.capturePaypalOrder = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.paymentService.capturePaypalOrder(orderId)];
                        case 1:
                            result = _a.sent();
                            // ← envoie l'email après capture réussie du paiement
                            return [4 /*yield*/, this.orderService.confirmPaymentAndNotify(orderId)];
                        case 2:
                            // ← envoie l'email après capture réussie du paiement
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        PaymentController_1.prototype.createCheckoutSession = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.stripeService.createCheckoutSession(dto.amount, dto.orderId, dto.currency)];
                });
            });
        };
        return PaymentController_1;
    }());
    __setFunctionName(_classThis, "PaymentController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createIntent_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('create-intent')];
        _handleWebhook_decorators = [(0, common_1.Post)('webhook'), (0, common_1.HttpCode)(200)];
        _createPaypalOrder_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('paypal/create-order')];
        _capturePaypalOrder_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('paypal/capture/:orderId')];
        _createCheckoutSession_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('create-checkout-session')];
        __esDecorate(_classThis, null, _createIntent_decorators, { kind: "method", name: "createIntent", static: false, private: false, access: { has: function (obj) { return "createIntent" in obj; }, get: function (obj) { return obj.createIntent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleWebhook_decorators, { kind: "method", name: "handleWebhook", static: false, private: false, access: { has: function (obj) { return "handleWebhook" in obj; }, get: function (obj) { return obj.handleWebhook; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPaypalOrder_decorators, { kind: "method", name: "createPaypalOrder", static: false, private: false, access: { has: function (obj) { return "createPaypalOrder" in obj; }, get: function (obj) { return obj.createPaypalOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _capturePaypalOrder_decorators, { kind: "method", name: "capturePaypalOrder", static: false, private: false, access: { has: function (obj) { return "capturePaypalOrder" in obj; }, get: function (obj) { return obj.capturePaypalOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createCheckoutSession_decorators, { kind: "method", name: "createCheckoutSession", static: false, private: false, access: { has: function (obj) { return "createCheckoutSession" in obj; }, get: function (obj) { return obj.createCheckoutSession; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentController = _classThis;
}();
exports.PaymentController = PaymentController;
