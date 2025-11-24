import { Inject, Injectable } from '@nestjs/common';
import { CreateProfile } from '../../core/Profile/Application/CreateProfile';
import { CreateProfileInterface } from '../../core/Profile/Domain/Persistance/CreateProfileInterface';
import { GetProfileInterface } from '../../core/Profile/Domain/Persistance/GetProfileInterface';
import { CreateProfileRequest } from '../../core/Profile/Application/DTO/CreateProfileRequest';
import { GetProfileById } from '../../core/Profile/Application/GetProfileById';
import { UpdateProfileRequest } from '../../core/Profile/Application/DTO/UpdateProfileRequest';
import { UpdateProfile } from '../../core/Profile/Application/UpdateProfile';

@Injectable()
export class ProfileService {
  public readonly createProfile: CreateProfile;
  public readonly getProfile: GetProfileById;
  public readonly updateProfile: UpdateProfile;
  constructor(
    @Inject('CreateProfileRepository')
    public readonly create: CreateProfileInterface,
    @Inject('GetProfileRepository')
    public readonly get: GetProfileInterface,
  ) {
    this.createProfile = new CreateProfile(this.create);
    this.getProfile = new GetProfileById(this.get);
    this.updateProfile = new UpdateProfile(this.getProfile, this.create);
  }
  async executeCreateProfile(request: CreateProfileRequest) {
    return this.createProfile.execute(request);
  }
  async executeGetProfileById(id: string) {
    return this.getProfile.execute(id);
  }
  async executeUpdateProfile(request: UpdateProfileRequest) {
    return this.updateProfile.execute(request);
  }
}
