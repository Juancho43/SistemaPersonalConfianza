import { UpdateGoalRequest } from '../../../../../core/Goal/Application/DTO/UpdateGoalRequest';
import { CreateGoalRequest } from '../../../../../core/Goal/Application/DTO/CreateGoalRequest';

describe('UpdateGoalRequest DTO', () => {
  it('constructs with id, profileId and nested CreateGoalRequest', () => {
    const nested = new CreateGoalRequest('p1','N', 12, 'd', 'PENDIENTE', undefined, 'BASICA');
    const req = new UpdateGoalRequest('g1', nested);

    expect(req.id).toBe('g1');
    expect(req.goal.profileId).toBe('p1');
    expect(req.goal).toBe(nested);
    expect(req.goal.name).toBe('N');
    expect(req.goal.cost).toBe(12);
  });
});