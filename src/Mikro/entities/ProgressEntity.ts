import { Entity, PrimaryKey, ManyToOne, Property } from '@mikro-orm/core';
import { ProgressiveGoalEntity } from './ProgressiveGoalEntity';

@Entity({ tableName: 'progress' })
export class ProgressEntity {
  @PrimaryKey({ type: 'string' })
  id!: string;
  @Property()
  progress: number;
  @Property({ nullable: true })
  date?: Date;
  @Property({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => ProgressiveGoalEntity)
  progressiveGoal!: ProgressiveGoalEntity;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
  @Property({ fieldName: 'deleted_at', nullable: true })
  deletedAt?: Date | null;
  constructor() {}
}
