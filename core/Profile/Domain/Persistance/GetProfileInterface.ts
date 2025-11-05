import { Profile } from '../Profile';

export interface GetProfileInterface {
  getById(id: string): Promise<Profile | null>;
}