import { Profile } from '../../Domain/Profile';
import { GoaleableResponse } from '../../../ProgressiveGoal/Application/DTO/GoaleableResponse';

export class ProfileResponse {
  static generate(profile: Profile) {
    return {
      id: profile.id ?? '',
      name: profile.name,
      totalConfidence: profile.totalConfidence,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      goals: profile.goals.map((g) => GoaleableResponse.generate(g)),
    };
  }
}
