import { CreateProgressRequest } from '../../../../../core/Progress/Application/DTO/CreateProgressRequest';

describe('CreateProgressRequest DTO', () => {
  it('allows setting required and optional fields', () => {
    const req = new CreateProgressRequest();
    req.progressiveGoalId = 'goal-1';
    req.progress = 50;
    req.date = new Date('2020-01-01');
    req.description = 'desc';

    expect(req.progressiveGoalId).toBe('goal-1');
    expect(req.progress).toBe(50);
    expect(req.date).toEqual(new Date('2020-01-01'));
    expect(req.description).toBe('desc');
  });

  it('has undefined optional fields when not set', () => {
    const req = new CreateProgressRequest();
    req.progressiveGoalId = 'g';
    req.progress = 10;

    expect(req.date).toBeUndefined();
    expect(req.description).toBeUndefined();
  });
});