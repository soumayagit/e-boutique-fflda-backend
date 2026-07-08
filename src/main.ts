import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'https://boutique-fflda.fr',
      'http://localhost:3000',
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('FFLDA API')
    .setDescription('Plateforme e-boutique FFLDA')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log('API running on https://boutique-fflda.fr/api/v1');
  console.log('Swagger : http://localhost:3000/docs');

  // ── Keep-alive : évite que Hostinger gèle le process en inactivité,
  // ce qui casse le timer interne du moteur Prisma ──
  setInterval(() => {
    console.log('💓 keep-alive ping');
  }, 4 * 60 * 1000); // toutes les 4 minutes
}

// ── Filet de sécurité : si un crash non catché survient malgré tout,
// on force un arrêt propre pour qu'Hostinger relance un process sain ──
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught exception, redémarrage forcé:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('💥 Unhandled rejection, redémarrage forcé:', reason);
  process.exit(1);
});

bootstrap();