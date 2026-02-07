import { Inject, Injectable } from '@nestjs/common';
import { CreateProfile } from '../../core/Profile/Application/CreateProfile';
import { CreateProfileInterface } from '../../core/Profile/Domain/Persistance/CreateProfileInterface';
import { GetProfileInterface } from '../../core/Profile/Domain/Persistance/GetProfileInterface';
import { CreateProfileRequest } from '../../core/Profile/Application/DTO/CreateProfileRequest';
import { GetProfileById } from '../../core/Profile/Application/GetProfileById';
import { UpdateProfileRequest } from '../../core/Profile/Application/DTO/UpdateProfileRequest';
import { UpdateProfile } from '../../core/Profile/Application/UpdateProfile';
import { GetAllProfiles } from '../../core/Profile/Application/GetAllProfiles';
import { GetAllProfilesInterface } from '../../core/Profile/Domain/Persistance/GetAllProfilesInterface';
import { SoftDeleteProfile } from '../../core/Profile/Application/SoftDeleteProfile';
import { DeleteProfileInterface } from '../../core/Profile/Domain/Persistance/SoftDeleteProfileInterface';
import { GetFilteredGoals } from '../../core/Profile/Application/GetFilteredGoals';
import { GetGoalsByStateInterface } from '../../core/Profile/Domain/Persistance/GetGoalsByStateInterface';
import { FilteredGoalsQuery } from '../../core/Profile/Application/DTO/FilteredGoalsQuery';

@Injectable()
export class ProfileService {
  public readonly createProfile: CreateProfile;
  public readonly getProfile: GetProfileById;
  public readonly updateProfile: UpdateProfile;
  public readonly getAllProfiles: GetAllProfiles;
  public readonly softDeleteProfile: SoftDeleteProfile;
  public readonly getFilteredGoals: GetFilteredGoals;
  constructor(
    @Inject('CreateProfileRepository')
    public readonly create: CreateProfileInterface,
    @Inject('GetProfileRepository')
    public readonly get: GetProfileInterface,
    @Inject('GetAllProfilesRepository')
    public readonly getAll: GetAllProfilesInterface,
    @Inject('SoftDeleteProfileRepository')
    public readonly softDelete: DeleteProfileInterface,
    @Inject('GetGoalsByStateRepository')
    public readonly getGoalsByState: GetGoalsByStateInterface,
  ) {
    this.createProfile = new CreateProfile(this.create);
    this.getProfile = new GetProfileById(this.get);
    this.updateProfile = new UpdateProfile(this.getProfile, this.create);
    this.getAllProfiles = new GetAllProfiles(this.getAll);
    this.softDeleteProfile = new SoftDeleteProfile(this.softDelete);
    this.getFilteredGoals = new GetFilteredGoals(this.getGoalsByState);
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
  async executeGetAllProfiles() {
    return this.getAllProfiles.execute();
  }
  async executeSoftDelete(id: string) {
    return this.softDeleteProfile.execute(id);
  }
  async executeGetFilteredGoals(query: FilteredGoalsQuery) {
    return this.getFilteredGoals.execute(query);
  }
}
