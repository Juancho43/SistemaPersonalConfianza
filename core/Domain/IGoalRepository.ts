import { Goal } from './Goal';

export interface IGoalRepository {
  save(goal: Goal): Promise<void>;

  getById(id: string): Promise<Goal | null>;
}
