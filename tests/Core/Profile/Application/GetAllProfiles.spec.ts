import { GetAllProfiles } from '../../../../core/Profile/Application/GetAllProfiles';

describe('GetAllProfiles Use Case', () => {
  it('returns all profiles when repository returns an array', async () => {
    const profiles = [{ id: 'p1' }, { id: 'p2' }];
    const repo = { getAll: jest.fn().mockResolvedValue(profiles) };
    const useCase = new GetAllProfiles(repo as any);

    const result = await useCase.execute();

    expect(repo.getAll).toHaveBeenCalled();
    expect(result).toBe(profiles);
  });

  it('propagates null (or value) from repository', async () => {
    const repo = { getAll: jest.fn().mockResolvedValue(null) };
    const useCase = new GetAllProfiles(repo as any);

    const result = await useCase.execute();

    expect(result).toBeNull();
  });
});