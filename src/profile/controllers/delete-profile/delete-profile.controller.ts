import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../../profile.service';
@ApiTags('Profile')
@Controller('profile')
export class DeleteProfileController {
  constructor(private readonly profileService: ProfileService) {
  }
  @Delete('softDelete/:id')
  async softDeleteProfile(@Param('id') id: string) {
    await this.profileService.executeSoftDelete(id);
  }
}

