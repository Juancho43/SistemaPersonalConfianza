import { AppController } from './app.controller';
import config from './mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GoalModule } from './goal/goal.module';
import { ProfileModule } from './profile/profile.module';
import { Module } from '@nestjs/common';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    GoalModule,
    ProfileModule,
    ProgressModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}
