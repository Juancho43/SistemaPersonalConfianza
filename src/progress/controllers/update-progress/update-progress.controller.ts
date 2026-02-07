import { Body, Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProgressRequest } from '../../../../core/Progress/Application/DTO/UpdateProgressRequest';
@ApiTags('Progress')
@Controller('progress')
export class UpdateProgressController {
  // Implementation will go here
  @Put('update')
  updateProgress(@Body() request: UpdateProgressRequest) {

  }
}
