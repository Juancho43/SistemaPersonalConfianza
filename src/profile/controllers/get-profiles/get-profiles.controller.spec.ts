import { Test, TestingModule } from '@nestjs/testing';
import { GetProfilesController } from './get-profiles.controller';

describe('GetProfilesController', () => {
  let controller: GetProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProfilesController],
    }).compile();

    controller = module.get<GetProfilesController>(GetProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
