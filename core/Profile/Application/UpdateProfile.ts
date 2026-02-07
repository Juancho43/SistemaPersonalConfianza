import { GetProfileById } from './GetProfileById';
import { CreateProfileInterface } from '../Domain/Persistance/CreateProfileInterface';
import { UpdateProfileRequest } from './DTO/UpdateProfileRequest';
import { Profile } from '../Domain/Profile';
import { IUseCase } from '../../Shared/IUseCase';

export class UpdateProfile implements IUseCase<UpdateProfileRequest, Profile> {
  constructor(
    private readonly getProfile: GetProfileById,
    private readonly save: CreateProfileInterface,
  ) {}
  async execute(request: UpdateProfileRequest): Promise<Profile> {
    const profile = await this.getProfile.execute(request.id);
    profile.name = request.name;
    await this.save.save(profile);
    return profile;
  }
}
