/* eslint-disable prettier/prettier */
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set("trust proxy", 1);
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.useStaticAssets(join(__dirname, "..", "src"));

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Api-PetLove: Self-Awareness")
    .setDescription(
      "Projeto de BootCamp realizado pela equipe 1 da Blue EdTech, com o intuito de criar uma aplicação fullstack para verificação dos níveis de conhecimento dos desenvolvedores.",
    )
    .setVersion("2.3.0")
    .addTag("Front-End")
    .addTag("Auth")
    .addTag("User")
    .addTag("Test")
    .addTag("Specialties")
    .addTag("Result")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
