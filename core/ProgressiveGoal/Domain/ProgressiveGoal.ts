import { Goal } from '../../Goal/Domain/Goal';
import { Progress } from '../../Progress/Domain/Progress';
import { Goaleable } from '../../Goal/Goaleable';
import { GoalState } from 'core/Goal/Domain/GoalState';
import { GoalType } from 'core/Goal/Domain/GoalType';

export class ProgressiveGoal implements Goaleable {
  private _id: string;
  private _goal: Goal;
  private _measureUnit: string;
  private _amount: number;
  private _currentProgress: number;
  private _progress: Progress[];
  private _pointsEarned: number;

  private constructor(
    id: string,
    goal: Goal,
    measureUnit: string,
    amount: number,
  ) {
    this.id = id;
    this.goal = goal;
    this.measureUnit = measureUnit;
    this.amount = amount;
    this.currentProgress = 0;
    this.progress = [];
  }
  getId(): string | undefined {
    return this._id;
  }
  getTotalPoints(): number {
    return this._pointsEarned;
  }
  getGoal(): Goal {
    return this._goal;
  }
  getState(): GoalState {
    return this._goal.getState();
  }
  getType(): GoalType {
    return this._goal.type;
  }

  public static create(
    id: string,
    goal: Goal,
    measureUnit: string,
    amount: number,
  ): ProgressiveGoal {
    return new ProgressiveGoal(id, goal, measureUnit, amount);
  }

  addProgress(progress: Progress): void {
    this._progress.push(progress);
    this._currentProgress += progress.progress;
    this.addPoints(progress.progress);
    if (this.isCompleted()) {
      this.goal.markAsComplete();
    }
  }

  private addPoints(points: number): void {
    this._pointsEarned =
      (this._pointsEarned ?? 0) + points * this.pointsToAdd();
  }
  private pointsToAdd(): number {
    return this._amount > 0 ? this.goal.coste_subjetivo / this._amount : 0;
  }
  remainingProgress(): number {
    return Math.max(0, this._amount - this._currentProgress);
  }

  isCompleted(): boolean {
    return this._currentProgress >= this._amount;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get goal(): Goal {
    return this._goal;
  }

  set goal(value: Goal) {
    this._goal = value;
  }

  get measureUnit(): string {
    return this._measureUnit;
  }

  set measureUnit(value: string) {
    this._measureUnit = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get currentProgress(): number {
    return this._currentProgress;
  }

  set currentProgress(value: number) {
    this._currentProgress = value;
  }

  get progress(): Progress[] {
    return this._progress;
  }

  set progress(value: Progress[]) {
    this._progress = value;
  }

  get pointsEarned(): number {
    return this._pointsEarned;
  }

  set pointsEarned(value: number) {
    this._pointsEarned = value;
  }

}
