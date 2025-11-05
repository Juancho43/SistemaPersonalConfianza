import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../../profile.service';
import { CreateProfileRequest } from '../../../../core/Profile/Application/DTO/CreateProfileRequest';
@ApiTags('Profile')
@Controller('profile')
export class CreateProfileController {
  constructor(private profileService: ProfileService) {}
  @Post('create')
  @ApiBody({
    description: 'Create new profile',
    schema: {
      example: {
        name: ' Guest',
      },
    },
  })
  async createProfile(@Body() request: CreateProfileRequest) {
    try {
      await this.profileService.executeCreateProfile(request);
    } catch (error) {
      return { message: 'Error creating profile', error: error.message };
    }
  }
}
