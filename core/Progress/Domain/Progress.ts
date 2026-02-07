import { ProgressiveGoal } from '../../ProgressiveGoal/Domain/ProgressiveGoal';

export class Progress{
  private _id: string;
  private _ProgressiveGoal: ProgressiveGoal;
  private _progress: number;
  private _date?: Date;
  private _description?: string;

  private constructor(id: string, progressiveGoal: ProgressiveGoal, progress: number, date?: Date, description?: string) {
    this._id = id;
    this._ProgressiveGoal = progressiveGoal;
    this._progress = progress;
    this._date = date;
    this._description = description;
  }

  public static create(id: string, progressiveGoal: ProgressiveGoal, progress: number, date?: Date, description?: string): Progress{
    return new Progress(id, progressiveGoal, progress, date, description);
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get ProgressiveGoal(): ProgressiveGoal {
    return this._ProgressiveGoal;
  }

  set ProgressiveGoal(value: ProgressiveGoal) {
    this._ProgressiveGoal = value;
  }

  get progress(): number {
    return this._progress;
  }

  set progress(value: number) {
    this._progress = value;
  }

  get date(): Date | undefined{
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}