import { ProgressiveGoal } from '../ProgressiveGoal';

export interface CreateProgressiveGoalInterface{
  save(progressiveGoal: ProgressiveGoal): Promise<void>;
}