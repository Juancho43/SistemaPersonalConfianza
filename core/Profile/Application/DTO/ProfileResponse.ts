import { Profile } from '../../Domain/Profile';
import { GoalResponse } from '../../../Goal/Application/DTO/GoalResponse';

export class ProfileResponse {
  static generate(profile: Profile) {
    return {
      id: profile.id ?? '',
      name: profile.name,
      totalConfidence: profile.totalConfidence,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      goals: GoalResponse.generateCollection(profile.goals),
    };
  }
}
