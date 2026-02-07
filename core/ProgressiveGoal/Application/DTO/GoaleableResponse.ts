import { Goaleable } from '../../../Goal/Goaleable';
import { GoalResponse } from '../../../Goal/Application/DTO/GoalResponse';

export class GoaleableResponse {
  public static generate(goaleable: Goaleable) {
    return {
      id: goaleable.getId(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      goal: GoalResponse.generate(goaleable.getGoal()),
      type: goaleable.getType().getValue(),
      state: goaleable.getState().getValue(),
      totalPoints: goaleable.getTotalPoints(),
    };
  }
}
