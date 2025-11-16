import { Test, TestingModule } from '@nestjs/testing';
import { GetGoalsController } from './get-goals.controller';

describe('GetGoalsController', () => {
  let controller: GetGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetGoalsController],
    }).compile();

    controller = module.get<GetGoalsController>(GetGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
