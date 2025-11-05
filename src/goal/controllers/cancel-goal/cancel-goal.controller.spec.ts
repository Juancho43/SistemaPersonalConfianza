import { Test, TestingModule } from '@nestjs/testing';
import { CancelGoalController } from './cancel-goal.controller';

describe('CancelGoalController', () => {
  let controller: CancelGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancelGoalController],
    }).compile();

    controller = module.get<CancelGoalController>(CancelGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
