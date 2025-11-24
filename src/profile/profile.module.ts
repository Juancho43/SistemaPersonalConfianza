import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileController } from './controllers/create-profile/create-profile.controller';
import { MikroGetProfileRepository } from './Repositories/MikroGetProfileRepository';
import { MikroCreateProfileRepository } from './Repositories/MikroCreateProfileRepository';
import { GetProfileByIdController } from './controllers/get-profile-by-id/get-profile-by-id.controller';
import { GetGoalsController } from './controllers/get-goals/get-goals.controller';
import { UpdateProfileController } from './controllers/update-profile/update-profile.controller';

@Module({
  controllers: [
    CreateProfileController,
    GetProfileByIdController,
    UpdateProfileController,
    GetGoalsController,
  ],
  providers: [
    ProfileService,
    {
      provide: 'GetProfileRepository',
      useClass: MikroGetProfileRepository,
    },
    {
      provide: 'CreateProfileRepository',
      useClass: MikroCreateProfileRepository,
    },
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
