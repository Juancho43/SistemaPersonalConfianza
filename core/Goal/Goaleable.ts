import { Goal } from './Domain/Goal';
import { GoalType } from './Domain/GoalType';
import { GoalState } from './Domain/GoalState';

export interface Goaleable {
  getTotalPoints(): number;
  getId(): string | undefined;
  getGoal(): Goal;
  getState(): GoalState;
  getType(): GoalType;
}
