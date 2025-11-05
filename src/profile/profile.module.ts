import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileController } from './controllers/create-profile/create-profile.controller';
import { MikroGetProfileRepository } from './Repositories/MikroGetProfileRepository';
import { MikroCreateProfileRepository } from './Repositories/MikroCreateProfileRepository';
import { GetProfileByIdController } from './controllers/get-profile-by-id/get-profile-by-id.controller';

@Module({
  controllers: [CreateProfileController, GetProfileByIdController],
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
