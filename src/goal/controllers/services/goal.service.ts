import { Inject, Injectable } from '@nestjs/common';
import { CreateGoal } from '../../../../core/Application/CreateGoal';
import { CreateGoalRequest } from '../../../../core/Application/DTO/CreateGoalRequest';
import type { IGoalRepository } from '../../../../core/Domain/IGoalRepository';
import { GoalRepositoryToken } from './goal.constants';
import { GetGoalById } from '../../../../core/Application/GetGoalById';

@Injectable()
export class GoalService {
  private readonly createGoal: CreateGoal;
  private readonly getGoalById: GetGoalById;
  constructor(
    @Inject(GoalRepositoryToken)
    private readonly repository: IGoalRepository,
  ) {
    this.getGoalById = new GetGoalById(this.repository);
    this.createGoal = new CreateGoal(this.repository, this.getGoalById);
  }

  executeCreateGoal(request: CreateGoalRequest) {
    return this.createGoal.execute(request);
  }
}
