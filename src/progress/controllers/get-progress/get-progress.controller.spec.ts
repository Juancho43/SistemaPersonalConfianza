import { Test, TestingModule } from '@nestjs/testing';
import { GetProgressController } from './get-progress.controller';

describe('GetProgressController', () => {
  let controller: GetProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProgressController],
    }).compile();

    controller = module.get<GetProgressController>(GetProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
