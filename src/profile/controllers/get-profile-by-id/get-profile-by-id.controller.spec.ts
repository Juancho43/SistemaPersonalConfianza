import { Test, TestingModule } from '@nestjs/testing';
import { GetProfileByIdController } from './get-profile-by-id.controller';

describe('GetProfileByIdController', () => {
  let controller: GetProfileByIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProfileByIdController],
    }).compile();

    controller = module.get<GetProfileByIdController>(GetProfileByIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
