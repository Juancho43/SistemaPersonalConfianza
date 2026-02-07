import { SoftDeleteProfile } from '../../../../core/Profile/Application/SoftDeleteProfile';

describe('SoftDeleteProfile Use Case', () => {
  it('returns the result from softDelete', async () => {
    const deleted = { id: 'p1', deletedAt: 'now' };
    const repo = { softDelete: jest.fn().mockResolvedValue(deleted) };
    const useCase = new SoftDeleteProfile(repo as any);

    const result = await useCase.execute('p1');

    expect(repo.softDelete).toHaveBeenCalledWith('p1');
    expect(result).toBe(deleted);
  });

  it('forwards null when repository returns null', async () => {
    const repo = { softDelete: jest.fn().mockResolvedValue(null) };
    const useCase = new SoftDeleteProfile(repo as any);

    const result = await useCase.execute('pX');

    expect(result).toBeNull();
  });
});