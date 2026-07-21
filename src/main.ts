import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // ← ajouté
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path'; // ← ajouté
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // ← <NestExpressApplication>

  // ── Sert le dossier uploads/ en statique via /uploads/... ──
 app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
  prefix: '/uploads/',
});

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
      'https://api.boutique-fflda.fr',
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
