import { GetAllProfilesInterface } from '../Domain/Persistance/GetAllProfilesInterface';
import { IUseCase } from '../../Shared/IUseCase';
import { Profile } from '../Domain/Profile';

export class GetAllProfiles implements IUseCase<void, Profile[] | null> {
  constructor(private readonly getAllRepository: GetAllProfilesInterface) {}
  async execute() {
    return this.getAllRepository.getAll();
  }
}
