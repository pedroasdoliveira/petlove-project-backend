import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API-PetLove')
    .setDescription('BootCamp')
    .setVersion('1.0.0')
    .addTag('Status')
    .addTag('Auth')
    .addTag('User')
    .addTag("Test")
    .addTag("Specialtie")
    .addTag("Result")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();

