import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ProfileEntity } from './ProfileEntity';

@Entity({ tableName: 'goals' })
export class GoalEntity {
  // Clave primaria: usa string UUID o numérico autoincremental
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property()
  nombre!: string;

  @Property({ type: 'text', nullable: true })
  descripcion?: string;

  @Property()
  coste_subjetivo!: number;

  @Property({ length: 20 })
  estado: string;

  @Property()
  penalizacion_restada: number = 0;

  @Property()
  tipo: string = 'BASICA';
  @Property()
  puntos_ganados: number = 0;
  @ManyToOne(() => ProfileEntity, { inversedBy: 'goals' })
  profile!: ProfileEntity;
  // Relación con el padre
  @ManyToOne(() => GoalEntity, { nullable: true })
  meta_padre?: GoalEntity;

  // Colección de submetas
  @OneToMany(() => GoalEntity, (meta) => meta.meta_padre)
  submetas = new Collection<GoalEntity>(this);

  @Property({ nullable: true })
  deadLine?: Date = new Date();

  // Timestamps opcionales pero recomendados
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
  @Property({ fieldName: 'deleted_at', nullable: true })
  deletedAt?: Date | null;

  constructor(
    nombre: string,
    coste_subjetivo: number,
    meta_padre?: GoalEntity,
  ) {
    this.nombre = nombre;
    this.coste_subjetivo = coste_subjetivo;
    if (meta_padre) {
      this.meta_padre = meta_padre;
    }
  }
}
