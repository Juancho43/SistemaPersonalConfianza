import { Test, TestingModule } from '@nestjs/testing';
import { GetGoalStatesController } from './get-goal-states.controller';

describe('GetGoalStatesController', () => {
  let controller: GetGoalStatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetGoalStatesController],
    }).compile();

    controller = module.get<GetGoalStatesController>(GetGoalStatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
