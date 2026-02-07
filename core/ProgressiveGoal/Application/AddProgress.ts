import { ProgressResponse } from '../../Progress/Application/DTO/ProgressResponse';
import { ProgressiveGoal } from '../Domain/ProgressiveGoal';
import { IUseCase } from '../../Shared/IUseCase';
import { CreateProgressRequest } from '../../Progress/Application/DTO/CreateProgressRequest';
import { GetProgressiveGoal } from './GetProgressiveGoal';
import { CreateProgressInterface } from '../../Progress/Domain/Persistance/CreateProgressiveGoalInterface';
import { Progress } from '../../Progress/Domain/Progress';
import { randomUUID } from 'node:crypto';
import { CreateProgressiveGoalInterface } from '../Domain/Persistance/CreateProgressiveGoalInterface';

export class AddProgress implements IUseCase<CreateProgressRequest, ProgressiveGoal> {
  constructor(private getProgressiveGoal: GetProgressiveGoal, private save: CreateProgressInterface, private update: CreateProgressiveGoalInterface) {}

  async execute(param: CreateProgressRequest): Promise<ProgressiveGoal> {
    const progressiveGoal = await this.getProgressiveGoal.execute(param.progressiveGoalId);

    const progress = Progress.create(randomUUID().toString(), progressiveGoal, param.progress, param.date, param.description ?? '');
    await this.save.save(progress);
    progressiveGoal.addProgress(progress);
    await this.update.save(progressiveGoal);

    return progressiveGoal;
  }
}