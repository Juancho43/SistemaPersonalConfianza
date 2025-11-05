import { Goal } from '../../Domain/Goal';

export class GoalResponse {
  static generate(goal: Goal) {
    return {
      id: goal.id,
      title: goal.nombre,
      cost: goal.coste_subjetivo,
      description: goal.descripcion,
      state: goal.estado,
      goals: this.generateCollection(goal.submetas || []),

    };
  }

  static generateCollection(goals: Goal[]) {
    return goals.map((goal) => this.generate(goal));
  }
}
