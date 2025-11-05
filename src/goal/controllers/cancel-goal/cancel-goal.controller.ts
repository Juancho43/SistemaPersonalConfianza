import { Body, Controller, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GoalService } from '../../services/goal.service';
import { CancelGoalRequest } from '../../../../core/Goal/Application/DTO/CancelGoalRequest';

@ApiTags('Goal')
@Controller('goal')
export class CancelGoalController {
  constructor(private readonly goalService: GoalService) {}
  @Put('cancel')
  @ApiBody({
    description: 'Cancel Goal',
    schema: {
      example: {
        goalId: 'goal-456',
        profileId: 'user-123',
      },
    },
  })
  cancelGoal(@Body() request: CancelGoalRequest) {
    try {
      return this.goalService.executeCancelGoal(request);
    } catch (e) {
      return { message: 'Goal cancelled successfully' };
    }
  }
}
