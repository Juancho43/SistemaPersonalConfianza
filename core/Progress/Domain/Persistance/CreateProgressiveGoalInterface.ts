import { Progress } from '../Progress';

export interface CreateProgressInterface{
  save(progress: Progress): Promise<void>;
}