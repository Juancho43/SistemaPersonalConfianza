import { CreateProfile } from '../../../../core/Profile/Application/CreateProfile';
import { CreateProfileRequest } from '../../../../core/Profile/Application/DTO/CreateProfileRequest';

describe('CreateProfile Use Case', () => {
  it('creates a profile, saves it and returns the profile', async () => {
    const saveProfile = { save: jest.fn().mockResolvedValue(undefined) };
    const useCase = new CreateProfile(saveProfile as any);

    const req = new CreateProfileRequest('Alice');
    const result = await useCase.execute(req);

    expect(saveProfile.save).toHaveBeenCalledWith(expect.any(Object));
    expect(result.name).toBe('Alice');
    expect(result.id).toBeDefined();
  });
});