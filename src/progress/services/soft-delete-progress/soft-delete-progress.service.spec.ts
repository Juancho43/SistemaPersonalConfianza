import { Test, TestingModule } from '@nestjs/testing';
import { SoftDeleteProgressService } from './soft-delete-progress.service';

describe('SoftDeleteProgressService', () => {
  let service: SoftDeleteProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoftDeleteProgressService],
    }).compile();

    service = module.get<SoftDeleteProgressService>(SoftDeleteProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
