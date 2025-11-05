import { ProfileEntity } from '../../Mikro/entities/ProfileEntity';
import { Profile } from '../../../core/Profile/Domain/Profile';
import { GoalMapper } from '../../goal/Repositories/GoalMapper';

export class ProfileMapper {
  static toEntity(profile: Profile): ProfileEntity {
    const entity = new ProfileEntity();
    entity.id = profile.id;
    entity.name = profile.name;
    entity.totalConfidence = profile.totalConfidence;
    return entity;
  }
  static toDomain(entity: ProfileEntity): Profile {
    const profile = Profile.create(entity.name, entity.id);
    profile.totalConfidence = entity.totalConfidence;
    if (entity.goals?.isInitialized()) {
      const mappedGoals = entity.goals
        .getItems()
        .map((goalEntity) => GoalMapper.toDomain(goalEntity));

      // Asignar al profile (necesitás un método o setter para esto)
      mappedGoals.forEach((goal) => profile.addGoal(goal)); // O como lo hagas en tu dominio
    }
    return profile;
  }
}
