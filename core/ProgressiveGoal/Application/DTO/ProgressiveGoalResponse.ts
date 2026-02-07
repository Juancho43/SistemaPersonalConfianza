import { ProgressiveGoal } from '../../Domain/ProgressiveGoal';
import { GoalResponse } from '../../../Goal/Application/DTO/GoalResponse';
import { ProgressResponse } from '../../../Progress/Application/DTO/ProgressResponse';

export class ProgressiveGoalResponse {
  static generate(progressiveGoal: ProgressiveGoal) {
    return {
      id: progressiveGoal.id ?? '',
      goal: GoalResponse.generate(progressiveGoal.goal),
      measureUnit: progressiveGoal.measureUnit,
      amount: progressiveGoal.amount,
      currentProgress: progressiveGoal.currentProgress,
      progress: progressiveGoal.progress.map(p => ProgressResponse.generate(p)),
      pointsEarned: progressiveGoal.pointsEarned,
      pointsRemaining: progressiveGoal.remainingProgress(),
    }
  }
}