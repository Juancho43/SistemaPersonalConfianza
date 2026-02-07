import { Test, TestingModule } from '@nestjs/testing';
import { GetProgressService } from './get-progress.service';

describe('GetProgressService', () => {
  let service: GetProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProgressService],
    }).compile();

    service = module.get<GetProgressService>(GetProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
