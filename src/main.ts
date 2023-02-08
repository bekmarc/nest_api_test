import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Students example')
    .setDescription('The Students API description')
    .setVersion('1.0')
    .addTag('Students')
    .build();
  
  app.useGlobalPipes(new ValidationPipe())
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/students', app, document);

  await app.listen(3000);
}
bootstrap();
