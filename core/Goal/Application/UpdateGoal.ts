import { CreateGoalInterface } from '../Domain/Persistance/CreateGoalInterface';
import { CreateProfileInterface } from '../../Profile/Domain/Persistance/CreateProfileInterface';
import { UpdateGoalRequest } from './DTO/UpdateGoalRequest';
import { GetProfileById } from '../../Profile/Application/GetProfileById';
import { IUseCase } from '../../Shared/IUseCase';
import { Goal } from '../Domain/Goal';

export class UpdateGoal implements IUseCase<UpdateGoalRequest, Goal> {
  constructor(
    private saveGoal: CreateGoalInterface,
    private getProfile: GetProfileById,
    private saveProfile: CreateProfileInterface,
  ) {}
  async execute(request: UpdateGoalRequest) {
    const profile = await this.getProfile.execute(request.goal.profileId);
    const goal = profile.updateGoalSubjectiveCost(
      request.id,
      request.goal.cost,
    );
    goal.nombre = request.goal.name;
    goal.descripcion = request.goal.description!;
    goal.deadline = request.goal.deadline
      ? new Date(request.goal.deadline)
      : goal.deadline!;
    await this.saveProfile.save(profile);
    await this.saveGoal.save(goal);
    return goal;
  }
}
