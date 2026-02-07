import { Body, Controller, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GoalService } from '../../services/goal.service';
import { UpdateGoalRequest } from '../../../../core/Goal/Application/DTO/UpdateGoalRequest';

@ApiTags('Goal')
@Controller('goal')
export class UpdateGoalController {
  constructor(private service: GoalService) {}
  @Put('update')
  @ApiBody({
    description: 'Update Goal',
    schema: {
      example: {
        id: 'goal-456',
        profileId: 'user-123',
        goal: {
          name: 'Learn NestJS',
          description: 'Understand the basics of NestJS framework',
          cost: 34,
          state: 'PENDIENTE',
          deadline: '2024-12-31',
        },
      },
    },
  })
  async createGoal(@Body() request: UpdateGoalRequest) {
    try {
      return await this.service.executeUpdateGoal(request);
    } catch (e) {
      return e.toString();
    }
  }
}
