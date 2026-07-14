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
exports.AuthController = void 0;
// src/modules/auth/presentation/auth.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var auth_response_dto_1 = require("../application/dtos/auth-response.dto");
var jwt_auth_guard_1 = require("../infrastructure/guards/jwt-auth.guard");
var public_decorator_1 = require("../infrastructure/decorators/public.decorator");
var AuthController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Auth'), (0, common_1.Controller)('auth'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _register_decorators;
    var _login_decorators;
    var _refresh_decorators;
    var _logout_decorators;
    var _logoutAll_decorators;
    var _getProfile_decorators;
    var _forgotPassword_decorators;
    var _resetPassword_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
        }
        AuthController_1.prototype.register = function (dto) {
            return this.authService.register(dto);
        };
        AuthController_1.prototype.login = function (dto) {
            return this.authService.login(dto);
        };
        AuthController_1.prototype.refresh = function (dto) {
            return this.authService.refreshTokens(dto.refreshToken);
        };
        AuthController_1.prototype.logout = function (dto) {
            return this.authService.logout(dto.refreshToken);
        };
        AuthController_1.prototype.logoutAll = function (user) {
            return this.authService.logoutAll(user.id);
        };
        AuthController_1.prototype.getProfile = function (user) {
            return this.authService.getProfile(user.id);
        };
        // ── FORGOT PASSWORD ──────────────────────────────────────────────────────
        AuthController_1.prototype.forgotPassword = function (dto) {
            return this.authService.forgotPassword(dto.email);
        };
        // ── RESET PASSWORD ───────────────────────────────────────────────────────
        AuthController_1.prototype.resetPassword = function (dto) {
            return this.authService.resetPassword(dto.token, dto.newPassword);
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _register_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('register'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Creer un compte' }), (0, swagger_1.ApiResponse)({ status: 201, type: auth_response_dto_1.AuthResponseDto })];
        _login_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('login'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Connexion' }), (0, swagger_1.ApiResponse)({ status: 200, type: auth_response_dto_1.AuthResponseDto })];
        _refresh_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('refresh'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Renouveler les tokens' }), (0, swagger_1.ApiResponse)({ status: 200, type: auth_response_dto_1.TokensResponseDto })];
        _logout_decorators = [(0, common_1.Post)('logout'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Deconnexion' })];
        _logoutAll_decorators = [(0, common_1.Post)('logout-all'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Deconnecter toutes les sessions' })];
        _getProfile_decorators = [(0, common_1.Get)('me'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Mon profil' }), (0, swagger_1.ApiResponse)({ status: 200, type: auth_response_dto_1.UserResponseDto })];
        _forgotPassword_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('forgot-password'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Envoyer email réinitialisation' })];
        _resetPassword_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('reset-password'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Réinitialiser le mot de passe' })];
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: function (obj) { return "register" in obj; }, get: function (obj) { return obj.register; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refresh_decorators, { kind: "method", name: "refresh", static: false, private: false, access: { has: function (obj) { return "refresh" in obj; }, get: function (obj) { return obj.refresh; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logoutAll_decorators, { kind: "method", name: "logoutAll", static: false, private: false, access: { has: function (obj) { return "logoutAll" in obj; }, get: function (obj) { return obj.logoutAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: function (obj) { return "forgotPassword" in obj; }, get: function (obj) { return obj.forgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
