import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GoalModule } from './goal/goal.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [MikroOrmModule.forRoot(config), GoalModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
