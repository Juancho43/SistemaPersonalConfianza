import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // --- Configuración de Swagger ---
  const config = new DocumentBuilder()
    .setTitle('API Tracker de Confianza') // El nombre de tu app
    .setDescription(
      'Endpoints para la gestión de metas y el Nivel de Confianza.',
    )
    .setVersion('1.0')
    .addTag('metas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // La ruta de la documentación será /api/docs
  // ---------------------------------

  // Para el frontend de Angular/CORS
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
