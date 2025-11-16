import { GetProfileById } from '../../Profile/Application/GetProfileById';
import { CreateProfileInterface } from '../../Profile/Domain/Persistance/CreateProfileInterface';
import { CancelGoalRequest } from './DTO/CancelGoalRequest';
import { CreateGoalInterface } from '../Domain/Persistance/CreateGoalInterface';

export class CancelGoal {
  constructor(
    private readonly saveGoal: CreateGoalInterface,
    private readonly getProfile: GetProfileById,
    private readonly saveProfile: CreateProfileInterface,
  ) {}

  async execute(request: CancelGoalRequest) {
    const profile = await this.getProfile.execute(request.profileId);
    const canceledGoal = profile.cancelGoal(request.goalId);
    await this.saveGoal.save(canceledGoal);
    if (canceledGoal.submetas && canceledGoal.submetas.length) {
      await Promise.all(
        canceledGoal.submetas.map((sg) => this.saveGoal.save(sg)),
      );
    }
    await this.saveProfile.save(profile);
    return profile.totalConfidence;
  }
}
