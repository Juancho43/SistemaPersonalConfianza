import { Body, Controller, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../../profile.service';
import { ProfileResponse } from '../../../../core/Profile/Application/DTO/ProfileResponse';
import { UpdateProfileRequest } from '../../../../core/Profile/Application/DTO/UpdateProfileRequest';

@ApiTags('Profile')
@Controller('profile')
export class UpdateProfileController {
  constructor(private profileService: ProfileService) {}
  @Put('update')
  @ApiBody({
    description: 'Update a profile',
    schema: {
      example: {
        id: '12345',
        name: ' Guest',
      },
    },
  })
async execute(@Body() request: UpdateProfileRequest) {
      return ProfileResponse.generate(
        await this.profileService.executeUpdateProfile(request)
      );
    } catch (error) {
      return { message: 'Error creating profile', error: error.message };
    }
  }

