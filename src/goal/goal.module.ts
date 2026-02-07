import { Module } from '@nestjs/common';
import { GoalService } from './services/goal.service';
import { CreateGoalController } from './controllers/create-goal/create-goal.controller';
import { CompleteGoalController } from './controllers/complete-goal/complete-goal.controller';
import { UpdateGoalController } from './controllers/update-goal/update-goal.controller';
import { CancelGoalController } from './controllers/cancel-goal/cancel-goal.controller';
import { MikroGetGoalRepository } from './Repositories/MikroGetGoalRepository';
import { ProfileModule } from '../profile/profile.module';
import { MikroSaveGoalRepository } from './Repositories/MikroSaveGoalRepository';
import { GetGoalByIdController } from './controllers/get-goal-by-id/get-goal-by-id.controller';
import { GetGoalStatesController } from './controllers/get-goal-states/get-goal-states.controller';
import { GetGoalsByStateController } from './controllers/get-goals-by-state/get-goals-by-state.controller';
import { CreateProgressiveGoalController } from './controllers/create-progressive-goal/create-progressive-goal.controller';
import { GetGoalTypesController } from './controllers/get-goal-types/get-goal-types.controller';
import { MikroSaveProgressiveGoalRepository } from './Repositories/MikroSaveProgressiveGoalRepository';

@Module({
  controllers: [
    CreateGoalController,
    CompleteGoalController,
    UpdateGoalController,
    CancelGoalController,
    GetGoalByIdController,
    GetGoalStatesController,
    GetGoalsByStateController,
    CreateProgressiveGoalController,
    GetGoalTypesController,
  ],
  imports: [ProfileModule],
  providers: [
    GoalService,
    {
      provide: 'GetGoalByIdRepository',
      useClass: MikroGetGoalRepository,
    },
    {
      provide: 'CreateGoalRepository',
      useClass: MikroSaveGoalRepository,
    },
    {
      provide: 'CreateProgressiveGoalRepository',
      useClass: MikroSaveProgressiveGoalRepository,
    },
  ],
})
export class GoalModule {}
