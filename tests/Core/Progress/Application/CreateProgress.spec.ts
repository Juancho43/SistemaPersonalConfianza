
import { CreateProgress } from '../../../../core/Progress/Application/CreateProgress';
import { CreateProgressRequest } from '../../../../core/Progress/Application/DTO/CreateProgressRequest';

describe('CreateProgress Use Case', () => {
  it('sets provided progress, date and description on returned Progress-like object', async () => {
    const useCase = new CreateProgress();
    const date = new Date('2022-01-01T00:00:00.000Z');
    const req: CreateProgressRequest = new CreateProgressRequest();
    req.progressiveGoalId = 'goal-1';
    req.progress = 42;
    req.date = date;
    req.description = 'note';

    const result = await useCase.execute(req);

    expect(result.progress).toBe(42);
    expect(result.date).toEqual(date);
    expect(result.description).toBe('note');
  });

  it('provides defaults when date/description are missing (date becomes Date, description empty string)', async () => {
    const useCase = new CreateProgress();
    const req: CreateProgressRequest = new CreateProgressRequest();
    req.progressiveGoalId = 'goal-2';
    req.progress = 5;
    // date and description omitted

    const before = Date.now();
    const result = await useCase.execute(req);
    const after = Date.now();

    expect(result.progress).toBe(5);
    expect(result.date).toBeInstanceOf(Date);
    // ensure the generated date is "now"
    expect((result.date as Date).getTime()).toBeGreaterThanOrEqual(before);
    expect((result.date as Date).getTime()).toBeLessThanOrEqual(after + 1000);
    expect(result.description).toBe('');
  });
});