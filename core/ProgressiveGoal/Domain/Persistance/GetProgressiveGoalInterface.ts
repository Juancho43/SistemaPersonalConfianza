import { ProgressiveGoal } from '../ProgressiveGoal';

export interface GetProgressiveGoalInterface {
  getById(id: string): Promise<ProgressiveGoal | null>;
}