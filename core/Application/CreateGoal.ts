import { CreateGoalRequest } from './DTO/CreateGoalRequest';
import { Goal } from '../Domain/Goal';
import { IGoalRepository } from '../Domain/IGoalRepository';
import { randomUUID } from 'node:crypto';
import { GetGoalById } from './GetGoalById';

export class CreateGoal {
  constructor(
    private repository: IGoalRepository,
    private getById: GetGoalById,
  ) {}
  async execute(request: CreateGoalRequest): Promise<Goal> {
    const goal = Goal.create(
      request.name,
      request.cost,
      request.description,
      randomUUID().toString(),
    );
    goal.estado = request.state;
    if (request.parentGoalId) {
      goal.padre = await this.getById.execute(request.parentGoalId);
    }
    await this.repository.save(goal);
    return goal;
  }
}
