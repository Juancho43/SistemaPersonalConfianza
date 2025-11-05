import { Profile } from '../Profile';

export interface CreateProfileInterface {
  save(profile: Profile): Promise<void>;
}
