import { Goal } from '../Goal';

export interface CreateGoalInterface {
  save(goal: Goal): Promise<void>;
}