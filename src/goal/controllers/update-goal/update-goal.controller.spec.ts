import { Test, TestingModule } from '@nestjs/testing';
import { UpdateGoalController } from './update-goal.controller';

describe('UpdateGoalController', () => {
  let controller: UpdateGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateGoalController],
    }).compile();

    controller = module.get<UpdateGoalController>(UpdateGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
