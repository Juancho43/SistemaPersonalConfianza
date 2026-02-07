import { Goaleable } from '../../core/Goal/Goaleable';
import { ProgressiveGoalEntity } from './entities/ProgressiveGoalEntity';
import { GoalEntity } from './entities/GoalEntity';
import { GoalMapper } from '../goal/Repositories/GoalMapper';
import { ProgressiveGoal } from '../../core/ProgressiveGoal/Domain/ProgressiveGoal';

export class GoaleableMapper {
  // Implementa los métodos necesarios para mapear entre la entidad y el dominio
  public static toDomain(
    entity: ProgressiveGoalEntity | GoalEntity,
  ): Goaleable {
    if (entity instanceof ProgressiveGoalEntity) {
      return ProgressiveGoal.create(
        entity.id,
        GoalMapper.toDomain(entity.goal),
        entity.measureUnit,
        entity.amount,
      );
    } else {
      return GoalMapper.toDomain(entity);
    }
  }
}
