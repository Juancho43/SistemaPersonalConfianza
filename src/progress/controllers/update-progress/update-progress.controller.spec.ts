import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProgressController } from './update-progress.controller';

describe('UpdateProgressController', () => {
  let controller: UpdateProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateProgressController],
    }).compile();

    controller = module.get<UpdateProgressController>(UpdateProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
