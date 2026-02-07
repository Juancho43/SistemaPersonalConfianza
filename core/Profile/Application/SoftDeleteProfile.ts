import { DeleteProfileInterface } from '../Domain/Persistance/SoftDeleteProfileInterface';
import { Profile } from '../Domain/Profile';
import { IUseCase } from '../../Shared/IUseCase';

export class SoftDeleteProfile implements IUseCase<string, Profile | null> {
  constructor(private readonly deleteProfile: DeleteProfileInterface) {}

  async execute(id: string): Promise<Profile | null> {
    return await this.deleteProfile.softDelete(id);
  }
}