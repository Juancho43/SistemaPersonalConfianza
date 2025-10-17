// src/persistencia/meta.entity.ts (Dependiente de MikroORM)

import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Ref,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
// Importamos la Clase de Dominio para hacer la conversión si es necesario
// import { Meta } from '../dominio/Meta';

@Entity({ tableName: 'goals' })
export class GoalEntity {
  // 1. Atributos Requeridos por ORM
  @PrimaryKey()
  id!: number; // Clave primaria, manejada por la DB

  // 2. Atributos de la Historia de Usuario (HU)
  @Property()
  nombre!: string;

  @Property({ type: 'text', nullable: true })
  descripcion?: string;

  // 3. Atributos del Sistema de Puntos y Penalización
  @Property()
  coste_subjetivo!: number; // El valor CS (1-100)

  @Property({ default: 'PENDIENTE' })
  estado: 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA' = 'PENDIENTE';

  @Property({ default: 0 })
  penalizacion_restada: number = 0; // La resta aplicada por abandono o reajuste

  @Property({ default: 0 })
  puntos_ganados: number = 0; // Puntos ganados al completar (debe ser igual al CS)

  // 4. Atributos de Jerarquía (HU 1.2)

  // Relación Opcional: Muchas submetas (hijos) pueden pertenecer a una Meta (padre)
  @ManyToOne(() => GoalEntity, { nullable: true })
  meta_padre?: GoalEntity | null;

  // Relación Colección: Una Meta (padre) puede tener muchas submetas (hijos)
  @OneToMany(() => GoalEntity, (meta) => meta.meta_padre)
  submetas = new Collection<GoalEntity>(this);

  // Constructor simple
  constructor(nombre: string, coste_subjetivo: number, meta_padre?: GoalEntity) {
    this.nombre = nombre;
    this.coste_subjetivo = coste_subjetivo;
    if (meta_padre) {
      this.meta_padre = meta_padre;
    }
  }
}
