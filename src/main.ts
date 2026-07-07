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
      'http://localhost:3000', // pratique si tu testes le front en local avec un port fixe
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
}
bootstrap();