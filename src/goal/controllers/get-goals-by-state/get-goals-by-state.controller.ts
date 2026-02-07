import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../../../profile/profile.service';
import { GoaleableResponse } from '../../../../core/ProgressiveGoal/Application/DTO/GoaleableResponse';

@ApiTags('Goal')
@Controller('goal')
export class GetGoalsByStateController {
  constructor(@Inject() private readonly service: ProfileService) {}
  @Get('get/by/state/:order/:state/:profileId')
  async getGoalsByState(
    @Param('state') state: string,
    @Param('order') order: string,
    @Param('profileId') profileId: string,
  ) {
    try {
      const query = { profileId, state, order };
      const data = await this.service.executeGetFilteredGoals(query);

      return data.map((goal) => GoaleableResponse.generate(goal));
    } catch (e) {
      return e.message;
    }
  }
}
