import { CreateGoalRequest } from './DTO/CreateGoalRequest';
import { Goal } from '../Domain/Goal';
import { randomUUID } from 'node:crypto';
import { GetGoalById } from './GetGoalById';
import { GoalState } from '../Domain/GoalState';
import { CreateGoalInterface } from '../Domain/Persistance/CreateGoalInterface';
import { GetProfileById } from '../../Profile/Application/GetProfileById';
import { IUseCase } from '../../Shared/IUseCase';

export class CreateGoal implements IUseCase<CreateGoalRequest, Goal> {
  constructor(
    private createGoalInterface: CreateGoalInterface,
    private getById: GetGoalById,
    private getProfile: GetProfileById,
  ) {}
  async execute(request: CreateGoalRequest): Promise<Goal> {
    const profile = await this.getProfile.execute(request.profileId);
    const goal = Goal.create(
      request.name,
      request.cost,
      request.type,
      request.description,
      randomUUID().toString(),
    );
    goal.profile = profile;
    goal.estado = GoalState.fromValue(request.state);
    if (request.deadline) {
      goal.deadline = new Date(request.deadline);
    }
    if (request.parentGoalId !== undefined) {
      goal.padre = await this.getById.execute(request.parentGoalId);
    }
    profile.addGoal(goal);
    await this.createGoalInterface.save(goal);
    return goal;
  }
}
