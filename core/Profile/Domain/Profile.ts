import { Goal } from '../../Goal/Domain/Goal';
import { GoalState } from '../../Goal/Domain/GoalState';
import { Goaleable } from '../../Goal/Goaleable';

export class Profile {
  private _id?: string;
  private _name: string = 'Guest';
  private _totalConfidence: number = 0;
  private _goals: Goaleable[] = [];

  private constructor(name: string, id?: string) {
    this._id = id! ?? '';
    this._name = name;
  }

  public static create(name: string, id?: string): Profile {
    return new Profile(name, id);
  }

  // Getters para los tests
  get id(): string {
    return this._id ?? '';
  }

  set id(value: string) {
    this._id = value;
  }
  public get name(): string {
    return this._name;
  }
  public get totalConfidence(): number {
    return this._totalConfidence;
  }
  public get goals(): Goaleable[] {
    return this._goals;
  }

  // Método para agregar la meta
  public addGoal(goal: Goal): void {
    if (
      goal.padre &&
      goal.padre?.getGoal().estado != GoalState.PENDING().getValue()
    ) {
      throw new Error('Cannot add a subgoal to a non-pending parent goal.');
    }
    this._goals.push(goal);
  }

  public newGoal(goal: Goaleable): void {
    this.addGoal(goal.getGoal());
  }

  // Método clave para completar la meta y sumar puntos
  public completeGoal(goalId: string): Goal {
    const goalToComplete = this.hasGoal(goalId);

    if (!goalToComplete) {
      throw new Error(`Goal with ID ${goalId} not found in profile.`);
    }

    // Precondición: Solo suma puntos si la meta no estaba completada.
    // Aquí delegamos la lógica de negocio a la entidad Goal.
    const pointsGained = goalToComplete.getGoal().markAsComplete();

    // Si la meta devuelve puntos (es decir, no estaba completada previamente),
    // actualizamos el totalConfidence.
    if (
      pointsGained > 0 &&
      goalToComplete.getState().equals(GoalState.COMPLETED())
    ) {
      this._totalConfidence += pointsGained;
    }
    return goalToComplete.getGoal();
  }

  public cancelGoal(goalId: string): Goal {
    const goalToCancel = this.hasGoal(goalId);
    if (!goalToCancel) {
      throw new Error(`Goal with ID ${goalId} not found in profile.`);
    }

    const penaltyPercentage = 0.5; // 50% del Coste Subjetivo

    if (goalToCancel.getState().getValue() === 'PENDIENTE') {
      const penalty =
        goalToCancel.getGoal().coste_subjetivo * penaltyPercentage;
      this._totalConfidence -= penalty;
    }

    this._goals = this._goals.filter((g) => g.getId() !== goalId);
    goalToCancel.getGoal().marcar_abandonada();
    return goalToCancel.getGoal();
  }
  public updateGoalSubjectiveCost(
    goalId: string,
    newSubjectiveCost: number,
  ): Goal {
    const goal = this.hasGoal(goalId);

    if (!goal) {
      throw new Error(`Goal with ID ${goalId} not found in profile.`);
    }

    if (goal.getState().getValue() !== 'PENDIENTE') {
      throw new Error(
        `Cannot update subjective cost for goal ${goalId} as it is not in PENDIENTE state.`,
      );
    }

    const previousCost = goal.getGoal().coste_subjetivo;

    // Only apply penalty if the new cost is lower than the previous cost (overestimation)
    if (newSubjectiveCost < previousCost) {
      const penalty = previousCost - newSubjectiveCost;
      this._totalConfidence -= penalty;
    }

    // Update the goal's subjective cost
    goal.getGoal().coste_subjetivo = newSubjectiveCost;
    return goal.getGoal();
  }

  set name(value: string) {
    this._name = value;
  }

  set totalConfidence(value: number) {
    this._totalConfidence = value;
  }

  set goals(value: Goaleable[]) {
    this._goals = value;
  }
  private hasGoal(goalId: string): Goaleable | null {
    const findIn = (goals: Goaleable[]): Goaleable | null => {
      for (const g of goals) {
        if (g.getId() === goalId) return g;
        const children = g.getGoal().submetas;
        if (Array.isArray(children)) {
          const found = findIn(children);
          if (found) return found;
        }
      }
      return null;
    };

    return findIn(this._goals);
  }
}
