import { Progress } from '../Progress';

export interface GetProgressInterface {
  getById(id: string): Promise<Progress | null>;
}