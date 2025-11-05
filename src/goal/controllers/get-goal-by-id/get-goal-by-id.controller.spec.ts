import { Test, TestingModule } from '@nestjs/testing';
import { GetGoalByIdController } from './get-goal-by-id.controller';

describe('GetGoalByIdController', () => {
  let controller: GetGoalByIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetGoalByIdController],
    }).compile();

    controller = module.get<GetGoalByIdController>(GetGoalByIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
