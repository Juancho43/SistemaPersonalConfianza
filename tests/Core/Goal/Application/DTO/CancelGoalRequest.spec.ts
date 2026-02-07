// `tests/Core/Goal/Application/DTO/CancelGoalRequest.spec.ts`
import { CancelGoalRequest } from '../../../../../core/Goal/Application/DTO/CancelGoalRequest';

describe('CancelGoalRequest DTO', () => {
  it('constructs with profileId and goalId', () => {
    const req = new CancelGoalRequest('p-1', 'g-1');

    expect(req.profileId).toBe('p-1');
    expect(req.goalId).toBe('g-1');
  });
});