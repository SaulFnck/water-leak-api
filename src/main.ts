// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve datos basura que envíen en el JSON
      forbidNonWhitelisted: true, // Lanza error si envían propiedades no definidas en el DTO
    }),
  );

  await app.listen(envs.PORT);
  console.log(`Aplicación corriendo en puerto: ${envs.PORT}`);
}
bootstrap();
