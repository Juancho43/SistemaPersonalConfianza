import { Module } from '@nestjs/common';
import { GoalService } from './controllers/services/goal.service';
import { CreateGoalController } from './controllers/create-goal/create-goal.controller';
import { GoalRepositoryToken } from './controllers/services/goal.constants';
import { MikroGoalRepository } from './MikroGoalRepository';

@Module({
  controllers: [CreateGoalController],
  providers: [
    GoalService,
    {
      provide: GoalRepositoryToken,
      useClass: MikroGoalRepository,
    },
  ],
})
export class GoalModule {}
