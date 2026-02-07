import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoalType } from '../../../../core/Goal/Domain/GoalType';

@ApiTags('Goal')
@Controller('goal')
export class GetGoalTypesController {
  @Get('get/types')
  get() {
    return GoalType.getAllValid();
  }
}
