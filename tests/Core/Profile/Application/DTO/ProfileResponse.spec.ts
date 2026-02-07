import { ProfileResponse } from '../../../../../core/Profile/Application/DTO/ProfileResponse';
import * as GoalResponseModule from '../../../../../core/Goal/Application/DTO/GoalResponse';

describe('ProfileResponse.generate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('maps profile fields and delegates goals mapping to GoalResponse.generateCollection', () => {
    const fakeMappedGoals = [{ id: 'g1' }, { id: 'g2' }];
    jest.spyOn(GoalResponseModule.GoalResponse, 'generateCollection').mockReturnValue(fakeMappedGoals as any);

    const profile: any = {
      id: 'profile-42',
      name: 'Charlie',
      totalConfidence: 99,
      goals: [{}, {}],
    };

    const result = ProfileResponse.generate(profile);

    expect(result.id).toBe('profile-42');
    expect(result.name).toBe('Charlie');
    expect(result.totalConfidence).toBe(99);
    expect(result.goals).toBe(fakeMappedGoals);
    expect(GoalResponseModule.GoalResponse.generateCollection).toHaveBeenCalledWith(profile.goals);
  });

  it('falls back to empty id when profile.id is undefined', () => {
    const fakeMappedGoals: any[] = [];
    jest.spyOn(GoalResponseModule.GoalResponse, 'generateCollection').mockReturnValue(fakeMappedGoals);

    const profile: any = {
      // id omitted intentionally
      name: 'Delta',
      totalConfidence: 0,
      goals: [],
    };

    const result = ProfileResponse.generate(profile);

    expect(result.id).toBe('');
    expect(result.name).toBe('Delta');
    expect(result.totalConfidence).toBe(0);
    expect(result.goals).toBe(fakeMappedGoals);
  });
});
