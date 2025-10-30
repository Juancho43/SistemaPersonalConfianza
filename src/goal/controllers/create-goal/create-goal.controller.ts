import { Body, Controller, Post } from '@nestjs/common';
import { CreateGoalRequest } from '../../../../core/Application/DTO/CreateGoalRequest';
import { GoalService } from '../services/goal.service';
import { GoalResponse } from '../../../../core/Application/DTO/GoalResponse';
import { ApiTags } from '@nestjs/swagger';

@Controller('goal')
export class CreateGoalController {
  constructor(private service: GoalService) {}
  @ApiTags('Goal')
  @Post()
  async createGoal(@Body() request: CreateGoalRequest) {
    try {
      const data = await this.service.executeCreateGoal(request);
      return GoalResponse.generate(data);
    } catch (e) {
      return e.toString();
    }
  }
}
