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
exports.PaypalService = void 0;
var common_1 = require("@nestjs/common");
var PaypalService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaypalService = _classThis = /** @class */ (function () {
        function PaypalService_1(configService) {
            var _a, _b;
            this.configService = configService;
            this.clientId = (_a = this.configService.get('PAYPAL_CLIENT_ID')) !== null && _a !== void 0 ? _a : '';
            this.clientSecret = (_b = this.configService.get('PAYPAL_CLIENT_SECRET')) !== null && _b !== void 0 ? _b : '';
            this.baseUrl = 'https://api-m.sandbox.paypal.com';
            this.isSimulated =
                !this.clientId ||
                    this.clientId === 'SIMULATED' ||
                    this.clientId === 'PAYPAL_SANDBOX_CLIENT_ID';
            console.log('🔶 PayPal isSimulated:', this.isSimulated);
        }
        PaypalService_1.prototype.getAccessToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var credentials, response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            credentials = Buffer.from("".concat(this.clientId, ":").concat(this.clientSecret)).toString('base64');
                            return [4 /*yield*/, fetch("".concat(this.baseUrl, "/v1/oauth2/token"), {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': "Basic ".concat(credentials),
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: 'grant_type=client_credentials',
                                })];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            return [2 /*return*/, data.access_token];
                    }
                });
            });
        };
        PaypalService_1.prototype.createOrder = function (amount, currency, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken, response, data, approvalUrl;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // ── Mode simulé ── en premier avant tout appel réseau
                            if (this.isSimulated) {
                                console.log('🔶 PayPal createOrder simulé');
                                return [2 /*return*/, {
                                        orderId: "SIMULATED_PAYPAL_".concat(Date.now()),
                                        approvalUrl: null,
                                        simulated: true,
                                        message: 'PayPal Sandbox non configuré — intégration prévue en V2',
                                    }];
                            }
                            return [4 /*yield*/, this.getAccessToken()];
                        case 1:
                            accessToken = _c.sent();
                            return [4 /*yield*/, fetch("".concat(this.baseUrl, "/v2/checkout/orders"), {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': "Bearer ".concat(accessToken),
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        intent: 'CAPTURE',
                                        purchase_units: [
                                            {
                                                reference_id: orderId,
                                                amount: {
                                                    currency_code: currency.toUpperCase(),
                                                    value: amount.toFixed(2),
                                                },
                                                description: "Commande FFLDA #".concat(orderId),
                                            },
                                        ],
                                        application_context: {
                                            brand_name: 'FFLDA',
                                            landing_page: 'BILLING',
                                            user_action: 'PAY_NOW',
                                            return_url: 'http://localhost:60888/#/payment-success',
                                            cancel_url: 'http://localhost:60888/#/payment-cancel',
                                        },
                                    }),
                                })];
                        case 2:
                            response = _c.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            data = _c.sent();
                            approvalUrl = (_b = (_a = data.links) === null || _a === void 0 ? void 0 : _a.find(function (link) { return link.rel === 'approve'; })) === null || _b === void 0 ? void 0 : _b.href;
                            return [2 /*return*/, {
                                    orderId: data.id,
                                    approvalUrl: approvalUrl,
                                    simulated: false,
                                }];
                    }
                });
            });
        };
        PaypalService_1.prototype.captureOrder = function (paypalOrderId) {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken, response, data;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            // ── Mode simulé ──
                            if (this.isSimulated || paypalOrderId.startsWith('SIMULATED_')) {
                                return [2 /*return*/, {
                                        paypalOrderId: paypalOrderId,
                                        status: 'COMPLETED',
                                        captureId: "SIMULATED_CAPTURE_".concat(Date.now()),
                                        simulated: true,
                                    }];
                            }
                            return [4 /*yield*/, this.getAccessToken()];
                        case 1:
                            accessToken = _d.sent();
                            return [4 /*yield*/, fetch("".concat(this.baseUrl, "/v2/checkout/orders/").concat(paypalOrderId, "/capture"), {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': "Bearer ".concat(accessToken),
                                        'Content-Type': 'application/json',
                                    },
                                })];
                        case 2:
                            response = _d.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            data = _d.sent();
                            return [2 /*return*/, {
                                    paypalOrderId: data.id,
                                    status: data.status,
                                    captureId: (_c = (_b = (_a = data.purchase_units[0]) === null || _a === void 0 ? void 0 : _a.payments) === null || _b === void 0 ? void 0 : _b.captures[0]) === null || _c === void 0 ? void 0 : _c.id,
                                    simulated: false,
                                }];
                    }
                });
            });
        };
        return PaypalService_1;
    }());
    __setFunctionName(_classThis, "PaypalService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaypalService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaypalService = _classThis;
}();
exports.PaypalService = PaypalService;
