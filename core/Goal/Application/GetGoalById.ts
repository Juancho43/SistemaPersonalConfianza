import { GetGoalByIdInterface } from '../Domain/Persistance/GetGoalByIdInterface';
import { IUseCase } from '../../Shared/IUseCase';
import { Goal } from '../Domain/Goal';

export class GetGoalById implements IUseCase<string, Goal | null> {
  constructor(private repository: GetGoalByIdInterface) {}
  async execute(id: string) {
    const goal = await this.repository.getById(id);
    if (!goal) {
      throw new Error('Goal not found');
    }
    return goal;
  }
}
