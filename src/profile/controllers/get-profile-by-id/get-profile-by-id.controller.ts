import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../../profile.service';
import { ProfileResponse } from '../../../../core/Profile/Application/DTO/ProfileResponse';
@ApiTags('Profile')
@Controller('profile')
export class GetProfileByIdController {
  constructor(private profileService: ProfileService) {}
  @Get('get/id/:id')
  async getProfileById(@Param('id') id: string) {
    try {
      return ProfileResponse.generate(
        await this.profileService.executeGetProfileById(id),
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return { message: 'Error retrieving profile', error: message };
    }
  }
}
