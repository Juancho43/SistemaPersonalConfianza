import { Test, TestingModule } from '@nestjs/testing';
import { CreateGoalController } from './create-goal.controller';

describe('CreateGoalController', () => {
  let controller: CreateGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateGoalController],
    }).compile();

    controller = module.get<CreateGoalController>(CreateGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
