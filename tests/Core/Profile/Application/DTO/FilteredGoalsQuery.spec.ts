import { FilteredGoalsQuery } from '../../../../../core/Profile/Application/DTO/FilteredGoalsQuery';

describe('FilteredGoalsQuery DTO', () => {
  it('constructs with profileId, state and order', () => {
    const q = new FilteredGoalsQuery('profile-1', 'PENDIENTE', 'asc');
    expect(q.profileId).toBe('profile-1');
    expect(q.state).toBe('PENDIENTE');
    expect(q.order).toBe('asc');
  });
});
