import { Test, TestingModule } from '@nestjs/testing';
import { CompleteGoalController } from './complete-goal.controller';

describe('CompleteGoalController', () => {
  let controller: CompleteGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompleteGoalController],
    }).compile();

    controller = module.get<CompleteGoalController>(CompleteGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
