"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const order_controller_1 = require("./infrastructure/order.controller");
const order_service_1 = require("./application/use-cases/order.service");
const prisma_module_1 = require("../../../prisma/prisma.module");
const mail_module_1 = require("../mail/mail.module");
const invoice_service_1 = require("./application/use-cases/invoice.service");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, mail_module_1.MailModule],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, invoice_service_1.InvoiceService],
        exports: [order_service_1.OrderService],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map