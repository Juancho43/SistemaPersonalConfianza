import { Inject, Injectable } from '@nestjs/common';
import { CreateGoal } from '../../../core/Goal/Application/CreateGoal';
import { CreateGoalRequest } from '../../../core/Goal/Application/DTO/CreateGoalRequest';
import type { GetGoalByIdInterface } from '../../../core/Goal/Domain/Persistance/GetGoalByIdInterface';
import { GetGoalById } from '../../../core/Goal/Application/GetGoalById';
import { CompleteGoal } from '../../../core/Goal/Application/CompleteGoal';
import { CompleteGoalRequest } from '../../../core/Goal/Application/DTO/CompleteGoalRequest';
import { CreateGoalInterface } from '../../../core/Goal/Domain/Persistance/CreateGoalInterface';
import { UpdateGoal } from '../../../core/Goal/Application/UpdateGoal';
import { CancelGoal } from '../../../core/Goal/Application/CancelGoal';
import { ProfileService } from '../../profile/profile.service';
import { UpdateGoalRequest } from '../../../core/Goal/Application/DTO/UpdateGoalRequest';
import { CancelGoalRequest } from '../../../core/Goal/Application/DTO/CancelGoalRequest';
import { CreateProgressiveGoal } from '../../../core/ProgressiveGoal/Application/CreateProgressiveGoal';
import type {
  CreateProgressiveGoalInterface
} from '../../../core/ProgressiveGoal/Domain/Persistance/CreateProgressiveGoalInterface';
import {
  CreateProgressiveGoalRequest
} from '../../../core/ProgressiveGoal/Application/DTO/CreateProgressiveGoalRequest';

@Injectable()
export class GoalService {
  private readonly createGoal: CreateGoal;
  private readonly getGoalById: GetGoalById;
  private readonly completeGoal: CompleteGoal;
  private readonly updateGoal: UpdateGoal;
  private readonly cancelGoal: CancelGoal;

  private readonly createProgressiveGoal: CreateProgressiveGoal;

  constructor(
    @Inject()
    private readonly profileService: ProfileService,
    @Inject('GetGoalByIdRepository')
    private readonly repository: GetGoalByIdInterface,
    @Inject('CreateGoalRepository')
    private readonly createGoalRepository: CreateGoalInterface,
    @Inject('CreateProgressiveGoalRepository')
    private readonly createProgressiveGoalRepository: CreateProgressiveGoalInterface,
  ) {
    this.getGoalById = new GetGoalById(this.repository);
    this.createGoal = new CreateGoal(
      this.createGoalRepository,
      this.getGoalById,
      this.profileService.getProfile,
    );
    this.cancelGoal = new CancelGoal(
      this.createGoalRepository,
      this.profileService.getProfile,
      this.profileService.create,
    );
    this.updateGoal = new UpdateGoal(
      this.createGoalRepository,
      this.profileService.getProfile,
      this.profileService.create,
    );
    this.completeGoal = new CompleteGoal(
      this.profileService.getProfile,
      this.profileService.create,
      this.createGoalRepository,
    );
    this.createProgressiveGoal = new CreateProgressiveGoal(
      this.createGoal,
      this.createProgressiveGoalRepository,
    );
  }

  executeCompleteGoal(request: CompleteGoalRequest) {
    return this.completeGoal.execute(request);
  }
  executeCreateGoal(request: CreateGoalRequest) {
    return this.createGoal.execute(request);
  }
  executeUpdateGoal(request: UpdateGoalRequest) {
    return this.updateGoal.execute(request);
  }
  executeCancelGoal(request: CancelGoalRequest) {
    return this.cancelGoal.execute(request);
  }
  executeGetGoalById(id: string) {
    return this.getGoalById.execute(id);
  }
  executeCreateProgressiveGoal(request: CreateProgressiveGoalRequest) {
    return this.createProgressiveGoal.execute(request);
  }
}
