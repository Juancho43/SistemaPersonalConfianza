import { CreateProfileInterface } from '../Domain/Persistance/CreateProfileInterface';
import { CreateProfileRequest } from './DTO/CreateProfileRequest';
import { Profile } from '../Domain/Profile';
import { randomUUID } from 'node:crypto';

export class CreateProfile{
  constructor(private readonly saveProfile: CreateProfileInterface) {}

  async execute(request: CreateProfileRequest) {
    const profile = Profile.create(request.name, randomUUID().toString());
    await this.saveProfile.save(profile);
    return profile;
  }

}