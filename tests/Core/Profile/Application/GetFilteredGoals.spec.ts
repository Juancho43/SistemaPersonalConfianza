import { GetFilteredGoals } from '../../../../core/Profile/Application/GetFilteredGoals';
import { FilteredGoalsQuery } from '../../../../core/Profile/Application/DTO/FilteredGoalsQuery';

describe('GetFilteredGoals Use Case', () => {
  it('delegates to repository with correct parameters and returns goals', async () => {
    const expected = [{ id: 'g1' }];
    const repo = { getGoalsByState: jest.fn().mockResolvedValue(expected) };
    const useCase = new GetFilteredGoals(repo as any);

    const query = new FilteredGoalsQuery('profile-1', 'PENDIENTE', 'asc');
    const result = await useCase.execute(query);

    expect(repo.getGoalsByState).toHaveBeenCalledWith('profile-1', 'PENDIENTE', 'asc');
    expect(result).toBe(expected);
  });
});