import { GetProfileInterface } from '../Domain/Persistance/GetProfileInterface';
import { Profile } from '../Domain/Profile';

export class GetProfileById {
  constructor(private readonly repository: GetProfileInterface) {}
  async execute(id: string): Promise<Profile> {
    const profile = await this.repository.getById(id);
    if (profile === null) {
      throw new Error('Profile not found');
    }
    return profile;
  }
}
