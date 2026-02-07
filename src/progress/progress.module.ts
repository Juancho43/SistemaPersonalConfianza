import { Module } from '@nestjs/common';
import { GetProgressesController } from './controllers/get-progresses/get-progresses.controller';
import { CreateProgressController } from './controllers/create-progress/create-progress.controller';
import { CreateProgressService } from './services/create-progress/create-progress.service';
import { UpdateProgressService } from './services/update-progress/update-progress.service';
import { SoftDeleteProgressService } from './services/soft-delete-progress/soft-delete-progress.service';
import { UpdateProgressController } from './controllers/update-progress/update-progress.controller';
import { SoftDeleteProgressController } from './controllers/soft-delete-progress/soft-delete-progress.controller';
import { GetProgressController } from './controllers/get-progress/get-progress.controller';
import { GetProgressService } from './services/get-progress/get-progress.service';
import { GetProgressByIdService } from './services/get-progress-by-id/get-progress-by-id.service';

@Module({
  controllers: [
    CreateProgressController,
    GetProgressesController,
    UpdateProgressController,
    SoftDeleteProgressController,
    GetProgressController,
  ],
  providers: [
    GetProgressService,
    CreateProgressService,
    UpdateProgressService,
    SoftDeleteProgressService,
    GetProgressByIdService,
  ],
})
export class ProgressModule {}
