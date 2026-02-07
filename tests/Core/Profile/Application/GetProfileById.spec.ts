import { GetProfileById } from '../../../../core/Profile/Application/GetProfileById';

describe('GetProfileById Use Case', () => {
  it('returns profile when found', async () => {
    const profile = { id: 'p1', name: 'X' };
    const repo = { getById: jest.fn().mockResolvedValue(profile) };
    const useCase = new GetProfileById(repo as any);

    const result = await useCase.execute('p1');

    expect(repo.getById).toHaveBeenCalledWith('p1');
    expect(result).toBe(profile);
  });

  it('throws when repository returns null', async () => {
    const repo = { getById: jest.fn().mockResolvedValue(null) };
    const useCase = new GetProfileById(repo as any);

    await expect(useCase.execute('missing')).rejects.toThrow('Profile not found');
    expect(repo.getById).toHaveBeenCalledWith('missing');
  });
});