import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateProgressiveGoalRequest } from '../../../../core/ProgressiveGoal/Application/DTO/CreateProgressiveGoalRequest';
import { GoalService } from '../../services/goal.service';
import { ProgressiveGoalResponse } from '../../../../core/ProgressiveGoal/Application/DTO/ProgressiveGoalResponse';

@ApiTags('Goal')
@Controller('goal')
export class CreateProgressiveGoalController {
  constructor(private service: GoalService) {}
  @Post('create/progressive')
  @ApiBody({
    description: 'Create Goal',
    schema: {
      example: {
        measureUnit: 'pages',
        amount: 100,
        goal: {
          name: 'Learn NestJS',
          description: 'Understand the basics of NestJS framework',
          cost: 34,
          state: 'PENDIENTE',
          profileId: 'user-123',
          type: 'ACUMULATIVA',
          deadline: '2024-12-31',
        },
      },
    },
  })
  async createProgressiveGoal(@Body() request: CreateProgressiveGoalRequest) {
    try {
      return ProgressiveGoalResponse.generate(
        await this.service.executeCreateProgressiveGoal(request),
      );
    } catch (e) {
      return e.toString();
    }
  }
}
