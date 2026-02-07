import { Profile } from '../Profile';

export interface GetAllProfilesInterface {
  getAll(): Promise<Profile[] | null>;
}