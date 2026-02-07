import { Test, TestingModule } from '@nestjs/testing';
import { SoftDeleteProgressController } from './soft-delete-progress.controller';

describe('SoftDeleteProgressController', () => {
  let controller: SoftDeleteProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoftDeleteProgressController],
    }).compile();

    controller = module.get<SoftDeleteProgressController>(SoftDeleteProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
