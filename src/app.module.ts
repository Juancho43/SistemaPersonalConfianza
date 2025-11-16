import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GoalModule } from './goal/goal.module';
import { ProfileModule } from './profile/profile.module';
import { GetGoalsController } from './profile/controllers/get-goals/get-goals.controller';
import { UpdateProfileController } from './profile/controllers/update-profile/update-profile.controller';

@Module({
  imports: [MikroOrmModule.forRoot(config), GoalModule, ProfileModule],
  controllers: [AppController, UpdateProfileController],
  providers: [AppService],
})
export class AppModule {}
