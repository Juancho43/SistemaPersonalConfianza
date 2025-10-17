// mikro-orm.config.ts

import { defineConfig } from '@mikro-orm/sqlite';
import { Migrator } from '@mikro-orm/migrations';
import { Goal } from './entities/Goal';
// import { Meta } from './src/dominio/meta.entity'; // Asegúrate de que esta ruta sea correcta

// La función defineConfig infiere automáticamente el driver (sqlite)
const config = defineConfig({
  dbName: './tracker.sqlite3',

  // Define tus entidades aquí.
  // Es mejor usar directamente la clase si ya la importaste,
  // en lugar de depender de rutas de archivos compilados (.js)
  entities: [Goal],
  entitiesTs: ['./src/dominio/**/*.entity.ts'],

  // La propiedad 'type' es eliminada y reemplazada por el driver
  // del que importamos 'defineConfig'.

  allowGlobalContext: true,

  // Configuración de Migrations
  extensions: [Migrator], // Se recomienda usar la propiedad extensions para los módulos
  migrations: {
    path: './src/migrations',
    transactional: true,
  },

  // Asegúrate de que tu directorio de entidades esté accesible desde el archivo de configuración
  // (La ruta de entidadesTs es generalmente la que usa el CLI)
});

export default config;
