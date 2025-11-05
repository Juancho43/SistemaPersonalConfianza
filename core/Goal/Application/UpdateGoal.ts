import { GetGoalById } from './GetGoalById';
import { CreateGoalInterface } from '../Domain/Persistance/CreateGoalInterface';
import { CreateProfileInterface } from '../../Profile/Domain/Persistance/CreateProfileInterface';
import { UpdateGoalRequest } from './DTO/UpdateGoalRequest';
import { GetProfileById } from '../../Profile/Application/GetProfileById';

export class UpdateGoal {
  constructor(
    private getGoal: GetGoalById,
    private saveGoal: CreateGoalInterface,
    private getProfile: GetProfileById,
    private saveProfile: CreateProfileInterface,
  ) {}
  async execute(request: UpdateGoalRequest) {
    const goal = await this.getGoal.execute(request.id);

    const profile = await this.getProfile.execute(request.profileId);
    profile.updateGoalSubjectiveCost(request.id, request.goal.cost);
    console.log(request);

    goal.nombre = request.goal.name;
    goal.descripcion = request.goal.description!;
    await this.saveProfile.save(profile);
    await this.saveGoal.save(goal);
    return goal;
  }
}
