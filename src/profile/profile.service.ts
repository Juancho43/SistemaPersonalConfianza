import { Inject, Injectable } from '@nestjs/common';
import { CreateProfile } from '../../core/Profile/Application/CreateProfile';
import { CreateProfileInterface } from '../../core/Profile/Domain/Persistance/CreateProfileInterface';
import { GetProfileInterface } from '../../core/Profile/Domain/Persistance/GetProfileInterface';
import { CreateProfileRequest } from '../../core/Profile/Application/DTO/CreateProfileRequest';
import { GetProfileById } from '../../core/Profile/Application/GetProfileById';

@Injectable()
export class ProfileService {
  public readonly createProfile: CreateProfile;
  public readonly getProfile: GetProfileById;
  constructor(
    @Inject('CreateProfileRepository')
    public readonly create: CreateProfileInterface,
    @Inject('GetProfileRepository')
    public readonly get: GetProfileInterface,
  ) {
    this.createProfile = new CreateProfile(this.create);
    this.getProfile = new GetProfileById(this.get);
  }
  async executeCreateProfile(request: CreateProfileRequest) {
    return this.createProfile.execute(request);
  }
  async executeGetProfileById(id: string) {
    return this.getProfile.execute(id);
  }
}
