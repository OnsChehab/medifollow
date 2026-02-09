import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('MediFollow API')
    .setDescription('The MediFollow Platform API Documentation')
    .setVersion('1.0')
    .addTag('users', 'User management and profiles')
    .addTag('patients', 'Patient clinical records')
    .addTag('medical-data', 'Vitals and symptoms monitoring')
    .addTag('questionnaires', 'Clinical follow-up templates')
    .addTag('safety', 'Alerts and notifications')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
  console.log(`Swagger documentation: ${url}/api/docs`);
}
bootstrap();
