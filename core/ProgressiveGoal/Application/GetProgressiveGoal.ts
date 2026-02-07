import { IUseCase } from '../../Shared/IUseCase';
import { ProgressiveGoal } from '../Domain/ProgressiveGoal';
import { GetProgressiveGoalInterface } from '../Domain/Persistance/GetProgressiveGoalInterface';

export class GetProgressiveGoal implements IUseCase<string, ProgressiveGoal>{
  constructor(private getGoal: GetProgressiveGoalInterface) {
  }

  async execute(param: string): Promise<ProgressiveGoal> {
    const goal = await this.getGoal.getById(param);
    if (!goal) {
      throw new Error('Progressive Goal not found');
    }
    return goal;
  }
}