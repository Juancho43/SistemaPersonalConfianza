import { Test, TestingModule } from '@nestjs/testing';
import { GetProgressesController } from './get-progresses.controller';

describe('GetProgressesController', () => {
  let controller: GetProgressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProgressesController],
    }).compile();

    controller = module.get<GetProgressesController>(GetProgressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
