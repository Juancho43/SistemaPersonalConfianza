import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoalService } from '../../../goal/services/goal.service';
import { GoalResponse } from '../../../../core/Goal/Application/DTO/GoalResponse';

@ApiTags('Goal')
@Controller('goal')
export class GetGoalsController {

}
