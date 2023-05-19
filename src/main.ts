import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api') //configuracion de nombre de ruta endpois

  app.useGlobalPipes( //configuracions de pipes o validaciones en los DTO
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
    );
    
    await app.listen(3000);
}
bootstrap();
