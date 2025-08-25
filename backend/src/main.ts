import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuración de CORS específica
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || 'http://192.168.40.79:5001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración de validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('TK Soporte API')
    .setDescription('API para sistema de gestión de tickets de soporte')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Usar ConfigService para obtener el puerto
  const port = configService.get('PORT') || 5000;
  
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on: http://0.0.0.0:${port}`);
    console.log(`Swagger documentation available at: http://0.0.0.0:${port}/api`);
  });
}
bootstrap();