import { Test, TestingModule } from '@nestjs/testing';
import { CreateProgressiveGoalController } from './create-progressive-goal.controller';

describe('CreateProgressiveGoalController', () => {
  let controller: CreateProgressiveGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateProgressiveGoalController],
    }).compile();

    controller = module.get<CreateProgressiveGoalController>(CreateProgressiveGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
