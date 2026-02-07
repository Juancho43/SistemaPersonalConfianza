import { CompleteGoalRequest } from './DTO/CompleteGoalRequest';
import { GetProfileById } from '../../Profile/Application/GetProfileById';
import { CreateProfileInterface } from '../../Profile/Domain/Persistance/CreateProfileInterface';
import { CreateGoalInterface } from '../Domain/Persistance/CreateGoalInterface';
import { IUseCase } from '../../Shared/IUseCase';

export class CompleteGoal implements IUseCase<CompleteGoalRequest, number>{
  constructor(
    private readonly profileById: GetProfileById,
    private readonly profileRepository: CreateProfileInterface,
    private readonly goalSaveRepository: CreateGoalInterface,
  ) {}
  async execute(data: CompleteGoalRequest) {
    const profile = await this.profileById.execute(data.profileId);
    await this.goalSaveRepository.save(profile.completeGoal(data.goalId));
    await this.profileRepository.save(profile);
    return profile.totalConfidence;
  }
}
