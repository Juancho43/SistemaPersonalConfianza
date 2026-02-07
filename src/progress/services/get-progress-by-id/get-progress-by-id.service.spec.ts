import { Test, TestingModule } from '@nestjs/testing';
import { GetProgressByIdService } from './get-progress-by-id.service';

describe('GetProgressByIdService', () => {
  let service: GetProgressByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProgressByIdService],
    }).compile();

    service = module.get<GetProgressByIdService>(GetProgressByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
