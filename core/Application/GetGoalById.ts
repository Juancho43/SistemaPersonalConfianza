import { IGoalRepository } from '../Domain/IGoalRepository';

export class GetGoalById{

  constructor(private repository: IGoalRepository) {}
  async execute(id: string) {
    const goal = await this.repository.getById(id);
    if (!goal) {
      throw new Error('Goal not found');
    }
    return goal;

  }
}