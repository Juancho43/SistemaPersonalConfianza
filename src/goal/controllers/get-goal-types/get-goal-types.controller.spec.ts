import { Test, TestingModule } from '@nestjs/testing';
import { GetGoalTypesController } from './get-goal-types.controller';

describe('GetGoalTypesController', () => {
  let controller: GetGoalTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetGoalTypesController],
    }).compile();

    controller = module.get<GetGoalTypesController>(GetGoalTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
