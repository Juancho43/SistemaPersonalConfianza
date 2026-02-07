import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileController } from './controllers/create-profile/create-profile.controller';
import { MikroGetProfileRepository } from './Repositories/MikroGetProfileRepository';
import { MikroCreateProfileRepository } from './Repositories/MikroCreateProfileRepository';
import { GetProfileByIdController } from './controllers/get-profile-by-id/get-profile-by-id.controller';
import { GetGoalsController } from './controllers/get-goals/get-goals.controller';
import { UpdateProfileController } from './controllers/update-profile/update-profile.controller';
import { GetProfilesController } from './controllers/get-profiles/get-profiles.controller';
import { MikroGetAllProfilesRepository } from './Repositories/MikroGetAllProfilesRepository';
import { DeleteProfileController } from './controllers/delete-profile/delete-profile.controller';
import { MikroSoftDeleteProfileRepository } from './Repositories/MikroSoftDeleteProfileRepository';
import { MikroGetFilteredGoalsRepository } from './Repositories/MikroGetFilteredGoalsRepository';

@Module({
  controllers: [
    CreateProfileController,
    GetProfileByIdController,
    UpdateProfileController,
    GetGoalsController,
    GetProfilesController,
    DeleteProfileController,
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
    {
      provide: 'GetAllProfilesRepository',
      useClass: MikroGetAllProfilesRepository,
    },
    {
      provide: 'SoftDeleteProfileRepository',
      useClass: MikroSoftDeleteProfileRepository,
    },
    {
      provide: 'GetGoalsByStateRepository',
      useClass: MikroGetFilteredGoalsRepository,
    }
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
