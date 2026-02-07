import { IUseCase } from '../../Shared/IUseCase';
import { CreateProgressiveGoalRequest } from './DTO/CreateProgressiveGoalRequest';
import { ProgressiveGoal } from '../Domain/ProgressiveGoal';
import { CreateGoal } from '../../Goal/Application/CreateGoal';
import { randomUUID } from 'node:crypto';
import { CreateProgressiveGoalInterface } from '../Domain/Persistance/CreateProgressiveGoalInterface';

export class CreateProgressiveGoal
  implements IUseCase<CreateProgressiveGoalRequest, ProgressiveGoal>
{
  constructor(
    private readonly createGoal: CreateGoal,
    private progressiveGoalInterface: CreateProgressiveGoalInterface,
  ) {}

  async execute(
    request: CreateProgressiveGoalRequest,
  ): Promise<ProgressiveGoal> {
    console.log('CREANDO GOAL');
    const goal = await this.createGoal.execute(request.goal);

    console.log('CREANDO PROGRESSIVE GOAL');
    const progressiveGoal = ProgressiveGoal.create(
      randomUUID().toString(),
      goal,
      request.measureUnit,
      request.amount,
    );
    await this.progressiveGoalInterface.save(progressiveGoal);
    return progressiveGoal;
  }
}
