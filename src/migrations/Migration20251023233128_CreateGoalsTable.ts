import { Migration } from '@mikro-orm/migrations';

export class Migration20251023233128_CreateGoalsTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`goals\` (\`id\` text not null, \`nombre\` text not null, \`descripcion\` text null, \`coste_subjetivo\` integer not null, \`estado\` text not null default 'PENDIENTE', \`penalizacion_restada\` integer not null default 0, \`puntos_ganados\` integer not null default 0, \`meta_padre_id\` text null, \`created_at\` datetime not null, \`updated_at\` datetime not null, constraint \`goals_meta_padre_id_foreign\` foreign key(\`meta_padre_id\`) references \`goals\`(\`id\`) on delete set null on update cascade, primary key (\`id\`));`);
    this.addSql(`create index \`goals_meta_padre_id_index\` on \`goals\` (\`meta_padre_id\`);`);
  }

}
