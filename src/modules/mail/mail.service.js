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
exports.MailService = void 0;
// src/modules/mail/mail.service.ts
var common_1 = require("@nestjs/common");
var MailService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MailService = _classThis = /** @class */ (function () {
        function MailService_1(mailerService) {
            this.mailerService = mailerService;
        }
        MailService_1.prototype.sendResetEmail = function (email, token) {
            return __awaiter(this, void 0, void 0, function () {
                var resetUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resetUrl = "https://ton-site.com/reset-password?token=".concat(token);
                            return [4 /*yield*/, this.mailerService.sendMail({
                                    to: email,
                                    subject: 'Réinitialisation de votre mot de passe',
                                    html: "\n        <h1>R\u00E9initialisation de mot de passe</h1>\n        <p>Clique sur ce lien pour r\u00E9initialiser ton mot de passe :</p>\n        <a href=\"".concat(resetUrl, "\">").concat(resetUrl, "</a>\n        <p>Ce lien expire dans 1 heure.</p>\n      "),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.sendMail = function (to, subject, html) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mailerService.sendMail({ to: to, subject: subject, html: html })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.sendOrderConfirmation = function (email, firstName, orderId, items, total) {
            return __awaiter(this, void 0, void 0, function () {
                var itemsHtml;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            itemsHtml = items
                                .map(function (i) { return "<tr><td>".concat(i.name, "</td><td>").concat(i.quantity, "</td><td>").concat(i.price, " \u20AC</td></tr>"); })
                                .join('');
                            return [4 /*yield*/, this.mailerService.sendMail({
                                    to: email,
                                    subject: "\u2705 Votre commande est confirm\u00E9e",
                                    html: "\n        <div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;\">\n          <div style=\"background:#0D1B3E;padding:20px;text-align:center;\">\n            <h1 style=\"color:white;margin:0;\">\u2705 Commande confirm\u00E9e !</h1>\n          </div>\n          <div style=\"padding:20px;\">\n            <p>Bonjour <strong>".concat(firstName, "</strong>,</p>\n            <p>Votre commande <strong>#").concat(orderId.substring(0, 8).toUpperCase(), "</strong> a \u00E9t\u00E9 confirm\u00E9e.</p>\n            <table border=\"1\" cellpadding=\"8\" style=\"width:100%;border-collapse:collapse;\">\n              <tr style=\"background:#f0f0f0;\"><th>Produit</th><th>Quantit\u00E9</th><th>Prix</th></tr>\n              ").concat(itemsHtml, "\n            </table>\n            <p style=\"font-size:18px;\"><strong>Total : ").concat(total, " \u20AC</strong></p>\n            <p>Nous vous contacterons d\u00E8s que votre commande est exp\u00E9di\u00E9e.</p>\n          </div>\n          <div style=\"background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;\">\n            E-Boutique FFLDA \u00B7 France F\u00E9d\u00E9ration de Lutte et Disciplines Associ\u00E9es\n          </div>\n        </div>\n      "),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ── Emails statuts commande ───────────────────────────────────────────────
        MailService_1.prototype.sendOrderStatusConfirmed = function (email, firstName, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mailerService.sendMail({
                                to: email,
                                subject: "\u2705 Votre commande est confirm\u00E9e",
                                html: "\n        <div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;\">\n          <div style=\"background:#0D1B3E;padding:20px;text-align:center;\">\n            <h1 style=\"color:white;margin:0;\">\u2705 Commande confirm\u00E9e !</h1>\n          </div>\n          <div style=\"padding:20px;\">\n            <p>Bonjour <strong>".concat(firstName, "</strong>,</p>\n            <p>Votre commande <strong>#").concat(orderId.substring(0, 8).toUpperCase(), "</strong> a \u00E9t\u00E9 confirm\u00E9e par notre \u00E9quipe.</p>\n            <p>Nous pr\u00E9parons votre colis et vous informerons d\u00E8s son exp\u00E9dition.</p>\n          </div>\n          <div style=\"background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;\">\n            E-Boutique FFLDA \u00B7 France F\u00E9d\u00E9ration de Lutte et Disciplines Associ\u00E9es<br>\n            Cet email est automatique, merci de ne pas y r\u00E9pondre.\n          </div>\n        </div>\n      "),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.sendOrderShipped = function (email, firstName, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mailerService.sendMail({
                                to: email,
                                subject: "\uD83D\uDE9A Votre commande est exp\u00E9di\u00E9e",
                                html: "\n        <div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;\">\n          <div style=\"background:#0D1B3E;padding:20px;text-align:center;\">\n            <h1 style=\"color:white;margin:0;\">\uD83D\uDE9A Commande exp\u00E9di\u00E9e !</h1>\n          </div>\n          <div style=\"padding:20px;\">\n            <p>Bonjour <strong>".concat(firstName, "</strong>,</p>\n            <p>Votre commande <strong>#").concat(orderId.substring(0, 8).toUpperCase(), "</strong> est en route !</p>\n            <p>Vous recevrez votre colis sous 2 \u00E0 4 jours ouvr\u00E9s via Colissimo.</p>\n          </div>\n          <div style=\"background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;\">\n            E-Boutique FFLDA \u00B7 France F\u00E9d\u00E9ration de Lutte et Disciplines Associ\u00E9es<br>\n            Cet email est automatique, merci de ne pas y r\u00E9pondre.\n          </div>\n        </div>\n      "),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.sendOrderDelivered = function (email, firstName, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mailerService.sendMail({
                                to: email,
                                subject: "\uD83D\uDCE6 Votre commande a \u00E9t\u00E9 livr\u00E9e",
                                html: "\n        <div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;\">\n          <div style=\"background:#1D9E75;padding:20px;text-align:center;\">\n            <h1 style=\"color:white;margin:0;\">\uD83D\uDCE6 Commande livr\u00E9e !</h1>\n          </div>\n          <div style=\"padding:20px;\">\n            <p>Bonjour <strong>".concat(firstName, "</strong>,</p>\n            <p>Votre commande <strong>#").concat(orderId.substring(0, 8).toUpperCase(), "</strong> a \u00E9t\u00E9 livr\u00E9e.</p>\n            <p>Nous esp\u00E9rons que vous \u00EAtes satisfait de votre achat !</p>\n            <p>N'h\u00E9sitez pas \u00E0 laisser un avis sur notre boutique.</p>\n          </div>\n          <div style=\"background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;\">\n            E-Boutique FFLDA \u00B7 France F\u00E9d\u00E9ration de Lutte et Disciplines Associ\u00E9es<br>\n            Cet email est automatique, merci de ne pas y r\u00E9pondre.\n          </div>\n        </div>\n      "),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.sendOrderCancelled = function (email, firstName, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mailerService.sendMail({
                                to: email,
                                subject: "\u274C Votre commande a \u00E9t\u00E9 annul\u00E9e",
                                html: "\n        <div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;\">\n          <div style=\"background:#E30613;padding:20px;text-align:center;\">\n            <h1 style=\"color:white;margin:0;\">\u274C Commande annul\u00E9e</h1>\n          </div>\n          <div style=\"padding:20px;\">\n            <p>Bonjour <strong>".concat(firstName, "</strong>,</p>\n            <p>Votre commande <strong>#").concat(orderId.substring(0, 8).toUpperCase(), "</strong> a \u00E9t\u00E9 annul\u00E9e.</p>\n            <p>Si vous avez des questions, contactez-nous.</p>\n          </div>\n          <div style=\"background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;\">\n            E-Boutique FFLDA \u00B7 France F\u00E9d\u00E9ration de Lutte et Disciplines Associ\u00E9es<br>\n            Cet email est automatique, merci de ne pas y r\u00E9pondre.\n          </div>\n        </div>\n      "),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ── Notification admin : nouvelle commande ────────────────────────────────
        MailService_1.prototype.sendAdminNewOrder = function (email, adminName, orderId, total, requiresValidation) {
            return __awaiter(this, void 0, void 0, function () {
                var shortId, subject;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            shortId = orderId.substring(0, 8).toUpperCase();
                            subject = requiresValidation
                                ? "\uD83D\uDEE0\uFE0F Commande sur-mesure \u00E0 valider \u2014 #".concat(shortId)
                                : "\uD83D\uDED2 Nouvelle commande \u2014 #".concat(shortId);
                            return [4 /*yield*/, this.mailerService.sendMail({
                                    to: email,
                                    subject: subject,
                                    html: "\n      <div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;\">\n        <div style=\"background:".concat(requiresValidation ? '#185FA5' : '#0D1B3E', ";padding:20px;text-align:center;\">\n          <h1 style=\"color:white;margin:0;\">").concat(requiresValidation ? '🛠️ Commande à valider' : '🛒 Nouvelle commande', "</h1>\n        </div>\n        <div style=\"padding:20px;\">\n          <p>Bonjour <strong>").concat(adminName, "</strong>,</p>\n          <p>").concat(requiresValidation
                                        ? 'Une commande contenant un article sur-mesure attend votre validation avant paiement.'
                                        : 'Une nouvelle commande vient d\'être passée sur la boutique.', "</p>\n          <p><strong>Commande :</strong> #").concat(shortId, "</p>\n          <p><strong>Montant :</strong> ").concat(total.toFixed(2), " \u20AC</p>\n          <p>Connectez-vous \u00E0 l'interface admin pour la consulter.</p>\n        </div>\n        <div style=\"background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;\">\n          E-Boutique FFLDA \u00B7 France F\u00E9d\u00E9ration de Lutte et Disciplines Associ\u00E9es<br>\n          Cet email est automatique, merci de ne pas y r\u00E9pondre.\n        </div>\n      </div>\n    "),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MailService_1;
    }());
    __setFunctionName(_classThis, "MailService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MailService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MailService = _classThis;
}();
exports.MailService = MailService;
