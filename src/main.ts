import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MikroORM } from '@mikro-orm/core'; // 1. Importar MikroORM

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- INICIALIZACIÓN DE MIKROORM (Creación del Esquema) ---
  try {
    const orm = app.get(MikroORM);
    const generator = orm.getSchemaGenerator();
    const migrator = orm.getMigrator();

    // 1. Asegurarse de que la base de datos exista
    if (await generator.ensureDatabase()) {
      console.log('📁 Archivo de base de datos creado.');
    }

    // 2. Verificar si hay migraciones pendientes
    const pendingMigrations = await migrator.getPendingMigrations();
    const executedMigrations = await migrator.getExecutedMigrations();

    if (executedMigrations.length === 0 && pendingMigrations.length === 0) {
      // Primera vez: no hay migraciones en el sistema
      console.log(
        '🔧 Primera inicialización: creando esquema desde entidades...',
      );
      await generator.updateSchema();
      console.log('✅ Esquema inicial creado.');
    } else if (pendingMigrations.length > 0) {
      // Hay migraciones pendientes
      console.log(
        `📦 ${pendingMigrations.length} migraciones pendientes detectadas:`,
      );

      pendingMigrations.forEach((migration) => {
        console.log(`  - ${migration.name}`);
      });

      // En producción: advertir y NO ejecutar automáticamente
      if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️  MIGRACIONES PENDIENTES EN PRODUCCIÓN');
        console.warn('   Por seguridad, no se ejecutarán automáticamente.');
        console.warn('   Ejecuta manualmente: npm run migration:up');
        console.warn('   O configura AUTO_RUN_MIGRATIONS=true en .env');

        // Opción 1: Detener la aplicación (más seguro)
        if (process.env.AUTO_RUN_MIGRATIONS !== 'true') {
          process.exit(1);
        }

        // Opción 2: Continuar con advertencia (si AUTO_RUN_MIGRATIONS=true)
        console.log('🚀 Ejecutando migraciones en producción...');
        await migrator.up();
        console.log('✅ Migraciones ejecutadas correctamente.');
      } else {
        // En desarrollo: ejecutar automáticamente
        console.log(
          '🚀 Ejecutando migraciones automáticamente (modo desarrollo)...',
        );
        await migrator.up();
        console.log('✅ Migraciones completadas.');
      }
    } else {
      console.log(
        '✅ Base de datos actualizada, no hay migraciones pendientes.',
      );
    }

    console.log('✅ Sistema de base de datos listo.');
  } catch (error) {
    console.error('❌ Error al inicializar el esquema/migraciones:', error);

    // En producción, detener la aplicación si falla
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }

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
