import { Profile } from '../Profile';

export interface DeleteProfileInterface {
  softDelete(id: string): Promise<Profile | null>;
}