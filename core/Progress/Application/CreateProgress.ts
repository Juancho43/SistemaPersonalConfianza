import { IUseCase } from '../../Shared/IUseCase';
import { CreateProgressRequest } from './DTO/CreateProgressRequest';
import { Progress } from '../Domain/Progress';

export class CreateProgress implements IUseCase<CreateProgressRequest, Progress>
{


  async execute(param: CreateProgressRequest): Promise<Progress> {
    // Implementation logic to create a new Progress entity

    // const newProgress = Progress.create(randomUUID().toString())
    const newProgress = {} as Progress;
    // newProgress.progressiveGoalId = param.progressiveGoalId;
    newProgress.progress = param.progress;
    newProgress.date = param.date || new Date();
    newProgress.description = param.description || '';

    // Here you would typically save the newProgress to a database

    return newProgress;
  }
}