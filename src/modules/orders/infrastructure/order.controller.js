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
exports.OrderController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/infrastructure/guards/jwt-auth.guard");
var OrderController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('orders'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Controller)('orders')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createOrder_decorators;
    var _getUserOrders_decorators;
    var _getAllOrders_decorators;
    var _getOrderById_decorators;
    var _updateStatus_decorators;
    var _validateOrder_decorators;
    var OrderController = _classThis = /** @class */ (function () {
        function OrderController_1(orderService) {
            this.orderService = (__runInitializers(this, _instanceExtraInitializers), orderService);
        }
        OrderController_1.prototype.createOrder = function (req, dto) {
            return this.orderService.createOrder(req.user.id, dto);
        };
        OrderController_1.prototype.getUserOrders = function (req) {
            return this.orderService.getUserOrders(req.user.id);
        };
        OrderController_1.prototype.getAllOrders = function () {
            return this.orderService.getAllOrders();
        };
        OrderController_1.prototype.getOrderById = function (req, id) {
            return this.orderService.getOrderById(req.user.id, id);
        };
        OrderController_1.prototype.updateStatus = function (id, status) {
            return this.orderService.updateStatus(id, status);
        };
        // ── Admin : valide et chiffre une commande sur-mesure (tapis) ──
        OrderController_1.prototype.validateOrder = function (req, id, body) {
            return this.orderService.validateOrder(id, req.user.id, body.total);
        };
        return OrderController_1;
    }());
    __setFunctionName(_classThis, "OrderController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createOrder_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Créer une commande depuis le panier' })];
        _getUserOrders_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Liste mes commandes' })];
        _getAllOrders_decorators = [(0, common_1.Get)('admin/all'), (0, swagger_1.ApiOperation)({ summary: 'Admin — toutes les commandes' })];
        _getOrderById_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Détail d\'une commande' })];
        _updateStatus_decorators = [(0, common_1.Put)('admin/:id/status'), (0, swagger_1.ApiOperation)({ summary: 'Admin — modifier le statut' })];
        _validateOrder_decorators = [(0, common_1.Put)('admin/:id/validate'), (0, swagger_1.ApiOperation)({ summary: 'Admin — valide et chiffre une commande sur-mesure' })];
        __esDecorate(_classThis, null, _createOrder_decorators, { kind: "method", name: "createOrder", static: false, private: false, access: { has: function (obj) { return "createOrder" in obj; }, get: function (obj) { return obj.createOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserOrders_decorators, { kind: "method", name: "getUserOrders", static: false, private: false, access: { has: function (obj) { return "getUserOrders" in obj; }, get: function (obj) { return obj.getUserOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllOrders_decorators, { kind: "method", name: "getAllOrders", static: false, private: false, access: { has: function (obj) { return "getAllOrders" in obj; }, get: function (obj) { return obj.getAllOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrderById_decorators, { kind: "method", name: "getOrderById", static: false, private: false, access: { has: function (obj) { return "getOrderById" in obj; }, get: function (obj) { return obj.getOrderById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateStatus_decorators, { kind: "method", name: "updateStatus", static: false, private: false, access: { has: function (obj) { return "updateStatus" in obj; }, get: function (obj) { return obj.updateStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _validateOrder_decorators, { kind: "method", name: "validateOrder", static: false, private: false, access: { has: function (obj) { return "validateOrder" in obj; }, get: function (obj) { return obj.validateOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderController = _classThis;
}();
exports.OrderController = OrderController;
