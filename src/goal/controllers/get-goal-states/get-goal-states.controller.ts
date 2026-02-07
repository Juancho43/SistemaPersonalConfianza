import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoalState } from '../../../../core/Goal/Domain/GoalState';
@ApiTags('Goal')
@Controller('goal')
export class GetGoalStatesController {
  @Get('get/states')
  get() {
    return GoalState.getAllValid();
  }
}
