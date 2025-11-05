import { GetGoalByIdInterface } from '../Domain/Persistance/GetGoalByIdInterface';

export class GetGoalById {
  constructor(private repository: GetGoalByIdInterface) {}
  async execute(id: string) {
    const goal = await this.repository.getById(id);
    if (!goal) {
      throw new Error('Goal not found');
    }
    return goal;
  }
}
