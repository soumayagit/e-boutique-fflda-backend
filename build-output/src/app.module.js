"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./modules/auth/auth.module");
const jwt_auth_guard_1 = require("./modules/auth/infrastructure/guards/jwt-auth.guard");
const roles_guard_1 = require("./modules/auth/infrastructure/guards/roles.guard");
const users_module_1 = require("./modules/users/users.module");
const catalog_module_1 = require("./modules/catalog/catalog.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const cart_module_1 = require("./modules/cart/cart.module");
const prisma_module_1 = require("../prisma/prisma.module");
const orders_module_1 = require("./modules/orders/orders.module");
const mail_module_1 = require("./modules/mail/mail.module");
const wishlist_module_1 = require("./modules/wishlist/wishlist.module");
const promo_module_1 = require("./modules/promo/promo.module");
const payment_module_1 = require("./modules/payment/payment.module");
const upload_module_1 = require("./modules/upload/upload.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            catalog_module_1.CatalogModule,
            reviews_module_1.ReviewsModule,
            cart_module_1.CartModule,
            orders_module_1.OrdersModule,
            mail_module_1.MailModule,
            wishlist_module_1.WishlistModule,
            payment_module_1.PaymentModule,
            promo_module_1.PromoModule,
            upload_module_1.UploadModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map