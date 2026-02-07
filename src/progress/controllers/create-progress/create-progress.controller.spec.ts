import { Test, TestingModule } from '@nestjs/testing';
import { CreateProgressController } from './create-progress.controller';

describe('CreateProgressController', () => {
  let controller: CreateProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateProgressController],
    }).compile();

    controller = module.get<CreateProgressController>(CreateProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
