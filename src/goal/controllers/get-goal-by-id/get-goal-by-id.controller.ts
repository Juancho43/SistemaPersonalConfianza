import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoalService } from '../../services/goal.service';
import { GoalResponse } from '../../../../core/Goal/Application/DTO/GoalResponse';

@ApiTags('Goal')
@Controller('goal')
export class GetGoalByIdController {
  constructor(private goalService: GoalService) {}
  @Get('get/id/:id')
  async getProfileById(@Param('id') id: string) {
    try {
      return GoalResponse.generate(
        await this.goalService.executeGetGoalById(id),
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return { message: 'Error retrieving profile', error: message };
    }
  }
}
