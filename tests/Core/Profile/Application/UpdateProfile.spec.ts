import { UpdateProfile } from '../../../../core/Profile/Application/UpdateProfile';
import { UpdateProfileRequest } from '../../../../core/Profile/Application/DTO/UpdateProfileRequest';

describe('UpdateProfile Use Case', () => {
  let getProfile: any;
  let save: any;

  beforeEach(() => {
    getProfile = { execute: jest.fn() };
    save = { save: jest.fn().mockResolvedValue(undefined) };
  });

  it('fetches profile, updates name, saves and returns profile', async () => {
    const profile = { id: 'p1', name: 'Old' };
    getProfile.execute.mockResolvedValue(profile);

    const useCase = new UpdateProfile(getProfile as any, save as any);
    const req = new UpdateProfileRequest('p1', 'NewName');
    const result = await useCase.execute(req);

    expect(getProfile.execute).toHaveBeenCalledWith('p1');
    expect(profile.name).toBe('NewName');
    expect(save.save).toHaveBeenCalledWith(profile);
    expect(result).toBe(profile);
  });

  it('propagates error when getProfile.execute rejects', async () => {
    getProfile.execute.mockRejectedValue(new Error('profile missing'));
    const useCase = new UpdateProfile(getProfile as any, save as any);

    await expect(useCase.execute(new UpdateProfileRequest('missing', 'x'))).rejects.toThrow('profile missing');
    expect(save.save).not.toHaveBeenCalled();
  });
});