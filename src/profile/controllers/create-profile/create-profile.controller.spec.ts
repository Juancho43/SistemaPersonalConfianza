import { Test, TestingModule } from '@nestjs/testing';
import { CreateProfileController } from './create-profile.controller';

describe('CreateProfileController', () => {
  let controller: CreateProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateProfileController],
    }).compile();

    controller = module.get<CreateProfileController>(CreateProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
