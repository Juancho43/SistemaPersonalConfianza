import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MikroORM } from '@mikro-orm/core'; // 1. Importar MikroORM

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- INICIALIZACIÓN DE MIKROORM (Creación del Esquema) ---
  try {
    const orm = app.get(MikroORM);

    // Usar updateSchema() para crear tablas que falten
    // Esto asegurará que el esquema coincida con tus entidades sin perder datos.
    const generator = orm.getSchemaGenerator();

    // Opcional: Asegúrate de que la base de datos (el archivo .sqlite) exista
    if (await generator.ensureDatabase()) {
      console.log('Database file created (if it did not exist).');
    }

    // Actualiza el esquema, creando las tablas faltantes ('profiles' en este caso)
    await generator.updateSchema();

    console.log('✅ Esquema de base de datos actualizado y listo.');
  } catch (error) {
    console.error(
      '❌ Error al inicializar el esquema de la base de datos:',
      error,
    );
    throw error;
  }
  // --------------------------------------------------------

  // --- Configuración de Swagger ---
  const config = new DocumentBuilder()
    .setTitle('API Tracker de Confianza')
    .setDescription(
      'Endpoints para la gestión de metas y el Nivel de Confianza.',
    )
    .setVersion('1.0')
    .addTag('metas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  // ---------------------------------

  // Para el frontend de Angular/CORS
  app.enableCors();

  // Usamos el puerto 3000 por defecto si PORT no está definido (como en Neutralino)
  await app.listen(process.env.PORT ?? 3002);
  console.log(
    `🚀 Servidor backend escuchando en el puerto ${process.env.PORT ?? 3002}`,
  );
}

bootstrap();
