// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

//Tercer parcial
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
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
