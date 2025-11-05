import { Body, Controller, Post } from '@nestjs/common';
import { CreateGoalRequest } from '../../../../core/Goal/Application/DTO/CreateGoalRequest';
import { GoalService } from '../../services/goal.service';
import { GoalResponse } from '../../../../core/Goal/Application/DTO/GoalResponse';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Goal')
@Controller('goal')
export class CreateGoalController {
  constructor(private service: GoalService) {}
  @Post('create')
  @ApiBody({
    description: 'Create Goal',
    schema: {
      example: {
        name: 'Learn NestJS',
        description: 'Understand the basics of NestJS framework',
        cost: 34,
        state: 'PENDIENTE',
        profileId: 'user-123',
      },
    },
  })
  async createGoal(@Body() request: CreateGoalRequest) {
    try {
      const data = await this.service.executeCreateGoal(request);
      return GoalResponse.generate(data);
    } catch (e) {
      return e.toString();
    }
  }
}
