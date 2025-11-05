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

@Module({
  controllers: [
    CreateGoalController,
    CompleteGoalController,
    UpdateGoalController,
    CancelGoalController,
    GetGoalByIdController,
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
  ],
})
export class GoalModule {}
