import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Progress')
@Controller('progress')
export class GetProgressesController {
  @Get('get/goalId/:id')
  getProgressesByGoalId(@Param('id') goalId: string) {
    // Implementation will go here
  }
}
