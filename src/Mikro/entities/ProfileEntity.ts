import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { GoalEntity } from './GoalEntity';

@Entity({ tableName: 'profiles' })
export class ProfileEntity {
  // Usamos @PrimaryKey para definir la clave principal.
  // Si usas PostgreSQL o MySQL y quieres autoincremento, usarías @PrimaryKey({ autoincrement: true })
  // Dado que el tipo es string, asumiremos un UUID o una clave generada.
  @PrimaryKey()
  id: string;

  // @Property para campos simples. Usamos `getter` y `setter` para asegurar la inmutabilidad de la entidad
  @Property()
  name: string = 'Guest';

  // Propiedad para el puntaje de confianza. Mapea al campo 'total_confidence' en la base de datos.
  @Property({ fieldName: 'total_confidence' })
  totalConfidence: number = 0;

  // Relación One-to-Many: Un Perfil tiene muchas Metas.
  // Usamos Collection<Goal> para manejar la carga perezosa y las relaciones en MikroORM.
  // 'mappedBy' indica la propiedad en la entidad Goal que apunta de vuelta a Profile.
  @OneToMany(() => GoalEntity, (goal) => goal.profile, {
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
  })
  goals = new Collection<GoalEntity>(this);

  // El constructor vacío es recomendable para MikroORM
  constructor() {}
}
