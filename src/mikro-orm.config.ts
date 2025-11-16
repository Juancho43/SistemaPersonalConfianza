// mikro-orm.config.ts
import { Migrator } from '@mikro-orm/migrations';
import { ProfileEntity } from './Mikro/entities/ProfileEntity';
import { GoalEntity } from './Mikro/entities/GoalEntity'; // Importaciones de TS
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
const appDirName = process.env.APP_NAME || 'SPC';
const userDataDir =
  process.env.APPDATA ||
  (process.platform === 'darwin'
    ? path.join(os.homedir(), 'Library', 'Application Support')
    : path.join(os.homedir(), '.local', 'share'));
const dbPath = path.join(userDataDir, appDirName, 'tracker.sqlite3');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
import { SqliteDriver } from '@mikro-orm/sqlite';
import { defineConfig } from '@mikro-orm/core';
export default defineConfig({
  dbName: dbPath,
  driver: SqliteDriver,
  // 🔑 PASO CLAVE 1: Apuntar las Entidades al directorio compilado (JS)
  // Reemplaza esto con un path a los archivos JS compilados si estás en modo compilado.
  // En tu entorno, si usas 'entities: [GoalEntity, ProfileEntity]', MikroORM
  // intentará cargarlas. Si usas 'paths' debes apuntar a 'dist/entities/*.js'
  // o asegurarse de que las importaciones (como las que tienes) se resuelvan bien.
  entities: [GoalEntity, ProfileEntity], // Si compilas a JS, esta importación TS podría ser problemática.

  // 🔑 RECOMENDACIÓN: Usa globs apuntando a los archivos JS compilados si los importas.
  // entities: ['./dist/entities/*.js'], // Esta es la práctica estándar en producción/compilado.

  allowGlobalContext: true,
  extensions: [Migrator],

  migrations: {
    // 🔑 PASO CLAVE 2: Solo deja 'path' apuntando a la ubicación de los archivos JS compilados.
    path: './dist/migrations', // La ruta donde están los archivos JS de las migraciones

    // pathTs: './src/migrations', // <-- ELIMINAR O CONDICIONAR para el entorno compilado

    glob: '!(*.d).js', // Asegúrate de buscar SOLO archivos JS en la carpeta 'dist'
    transactional: true,
    disableForeignKeys: false,
  },
  debug: true,
});
