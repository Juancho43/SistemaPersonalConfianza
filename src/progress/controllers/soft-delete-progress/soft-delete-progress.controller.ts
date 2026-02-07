import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Progress')
@Controller('progress')
export class SoftDeleteProgressController {
  @Delete('softDelete/:id')
  softDeleteProgress(@Param('id') id: string){

  }
}
