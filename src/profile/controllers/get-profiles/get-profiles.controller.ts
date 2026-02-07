import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../../profile.service';
import { ProfileResponse } from '../../../../core/Profile/Application/DTO/ProfileResponse';
@ApiTags('Profile')
@Controller('profile')
export class GetProfilesController {
  constructor(private readonly profileService: ProfileService) {
  }

  @Get('get/all')
  async getAllProfiles() {
    try {
      const profiles = await this.profileService.executeGetAllProfiles();
      return profiles?.map((profile) => ProfileResponse.generate(profile))
    }catch (e) {
      return e.toString();
    }
  }
}
