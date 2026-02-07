import { Goaleable } from '../../Goaleable';
import { Goal } from '../../Domain/Goal';
import { GoaleableResponse } from '../../../ProgressiveGoal/Application/DTO/GoaleableResponse';

export class GoalResponse {
  static generate(goal: Goal) {
    return {
      id: goal.getId(),
      title: goal.getGoal().nombre,
      cost: goal.getGoal().coste_subjetivo,
      description: goal.getGoal().descripcion,
      earnedPoints: goal.getGoal().puntos_ganados,
      penaltyApplied: goal.getGoal().penalizacion_restada,
      state: goal.getGoal().estado,
      deadline: goal.getGoal().deadline,
      type: goal.getGoal().tipo,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      goals: goal.getGoal().submetas.map((g) => GoaleableResponse.generate(g)),
    };
  }

  static generateCollection(goals: Goaleable[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return goals.map((goal) => this.generate(goal.getGoal()));
  }
}
