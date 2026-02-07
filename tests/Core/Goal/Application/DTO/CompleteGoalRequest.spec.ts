import { CompleteGoalRequest } from '../../../../../core/Goal/Application/DTO/CompleteGoalRequest';

describe('CompleteGoalRequest DTO', () => {
  it('constructs with profileId and goalId', () => {
    const req = new CompleteGoalRequest('profile-42', 'goal-99');

    expect(req.profileId).toBe('profile-42');
    expect(req.goalId).toBe('goal-99');
  });
});