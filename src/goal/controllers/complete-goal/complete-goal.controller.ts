import { Body, Controller, Put } from '@nestjs/common';
import { GoalService } from '../../services/goal.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CompleteGoalRequest } from '../../../../core/Goal/Application/DTO/CompleteGoalRequest';

@ApiTags('Goal')
@Controller('goal')
export class CompleteGoalController {
  constructor(private service: GoalService) {}
  @Put('complete')
  @ApiBody({
    description: 'Complete a goal',
    schema: {
      example: {
        goalId: 'goal-456',
        profileId: 'user-123',
      },
    },
  })
  async createGoal(@Body() request: CompleteGoalRequest) {
    try {
      return await this.service.executeCompleteGoal(request);
    } catch (e) {
      return e.toString();
    }
  }
}
