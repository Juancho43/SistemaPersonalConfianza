import { Test, TestingModule } from '@nestjs/testing';
import { GetGoalsByStateController } from './get-goals-by-state.controller';

describe('GetGoalsByStateController', () => {
  let controller: GetGoalsByStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetGoalsByStateController],
    }).compile();

    controller = module.get<GetGoalsByStateController>(GetGoalsByStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
