import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProgressService } from './update-progress.service';

describe('UpdateProgressService', () => {
  let service: UpdateProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProgressService],
    }).compile();

    service = module.get<UpdateProgressService>(UpdateProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
