import { Goal } from '../Goal';

export interface GetGoalByIdInterface {
  getById(id: string): Promise<Goal | null>;
}
