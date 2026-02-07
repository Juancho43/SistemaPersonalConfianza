import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Progress')
@Controller('progress')
export class GetProgressController {
  @Get('get/id/:id')
  getProgressById(@Param('id') id: string) {
    // Implementation will go here
  }
}
