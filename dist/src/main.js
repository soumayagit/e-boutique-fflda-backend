"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: [
            'https://api.boutique-fflda.fr',
            'http://localhost:3000',
        ],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('FFLDA API')
        .setDescription('Plateforme e-boutique FFLDA')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
    console.log('API running on https://api.boutique-fflda.fr/api/v1');
    console.log('Swagger : http://localhost:3000/docs');
    setInterval(() => {
        console.log('💓 keep-alive ping');
    }, 4 * 60 * 1000);
}
process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught exception, redémarrage forcé:', err);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    console.error('💥 Unhandled rejection, redémarrage forcé:', reason);
    process.exit(1);
});
bootstrap();
//# sourceMappingURL=main.js.map