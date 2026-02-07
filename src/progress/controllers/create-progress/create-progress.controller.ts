import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProgressRequest } from '../../../../core/Progress/Application/DTO/CreateProgressRequest';
@ApiTags('Progress')
@Controller('progress')
export class CreateProgressController {
  @Post('create')
  createProgress(@Body() request: CreateProgressRequest): void {
    // Implementation for creating progress goes here
  }
}
