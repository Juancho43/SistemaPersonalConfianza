// typescript
import { ProgressiveGoal } from '../../../core/ProgressiveGoal/Domain/ProgressiveGoal';
import { ProgressiveGoalEntity } from '../../Mikro/entities/ProgressiveGoalEntity';
import { GoalMapper } from './GoalMapper';

export class ProgressiveGoalMapper {
  /**
   * Map a persistence entity to a domain object.
   * Uses a tolerant approach: if the domain expos


es a static `create` it will be used,
   * otherwise a plain instance is returned and populated with available fields.
   */
  public static toDomain(entity: ProgressiveGoalEntity): ProgressiveGoal {
    return ProgressiveGoal.create(
      entity.id,
      GoalMapper.toDomain(entity.goal),
      entity.measureUnit,
      entity.amount,
    );
  }

  /**
   * Map a domain object to a persistence entity.
   * This is intended for creating new entities; updating existing ones should use em.assign() or Object.assign().
   */
  public static toEntity(domain: ProgressiveGoal): ProgressiveGoalEntity {
    const entity = new ProgressiveGoalEntity();
    entity.id = domain.id!;
    entity.measureUnit = domain.measureUnit;
    entity.amount = domain.amount;
    return entity;
  }
}
