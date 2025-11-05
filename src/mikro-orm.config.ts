import { defineConfig } from '@mikro-orm/sqlite';
import { Migrator } from '@mikro-orm/migrations';
import { GoalEntity } from './Mikro/entities/GoalEntity';
import { ProfileEntity } from './Mikro/entities/ProfileEntity';

export default defineConfig({
  dbName: './tracker.sqlite3',
  // Runtime: point to compiled JS files
  entities: [GoalEntity, ProfileEntity],

  allowGlobalContext: true,
  extensions: [Migrator],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: false,
  },
  debug: true,
});
