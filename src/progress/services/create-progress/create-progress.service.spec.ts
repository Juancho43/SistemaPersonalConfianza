import { Test, TestingModule } from '@nestjs/testing';
import { CreateProgressService } from './create-progress.service';

describe('CreateProgressService', () => {
  let service: CreateProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProgressService],
    }).compile();

    service = module.get<CreateProgressService>(CreateProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
