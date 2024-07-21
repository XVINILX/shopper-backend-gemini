import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ////
  const config = new DocumentBuilder()
    .setTitle('Pets APi')
    .setDescription('API made for a Pets API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
