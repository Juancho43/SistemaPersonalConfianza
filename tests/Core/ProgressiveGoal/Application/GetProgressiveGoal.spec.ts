import { GetProgressiveGoal } from '../../../../core/ProgressiveGoal/Application/GetProgressiveGoal';

describe('GetProgressiveGoal Use Case', () => {
  it('returns the progressive goal when found', async () => {
    const pg = { id: 'pg-1' };
    const repo = { getById: jest.fn().mockResolvedValue(pg) };
    const useCase = new GetProgressiveGoal(repo as any);

    const result = await useCase.execute('pg-1');

    expect(repo.getById).toHaveBeenCalledWith('pg-1');
    expect(result).toBe(pg);
  });

  it('throws when the progressive goal is not found', async () => {
    const repo = { getById: jest.fn().mockResolvedValue(null) };
    const useCase = new GetProgressiveGoal(repo as any);

    await expect(useCase.execute('missing')).rejects.toThrow('Progressive Goal not found');
    expect(repo.getById).toHaveBeenCalledWith('missing');
  });
});