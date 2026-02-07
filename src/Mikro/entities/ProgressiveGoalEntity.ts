import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { GoalEntity } from './GoalEntity';
import { ProgressEntity } from './ProgressEntity';

@Entity({ tableName: 'progressive_goals' })
export class ProgressiveGoalEntity {
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property()
  measureUnit!: string;

  @Property()
  amount!: number;

  @ManyToOne(() => GoalEntity, { fieldName: 'goal_id', nullable: false })
  goal!: GoalEntity;

  @OneToMany(() => ProgressEntity, (progress) => progress.progressiveGoal)
  progresses: ProgressEntity[] = [];

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
  @Property({ fieldName: 'deleted_at', nullable: true })
  deletedAt?: Date | null;
  constructor() {}
}
