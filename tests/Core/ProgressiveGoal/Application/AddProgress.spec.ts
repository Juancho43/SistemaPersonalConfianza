import { AddProgress } from '../../../../core/ProgressiveGoal/Application/AddProgress';
import { CreateProgressRequest } from '../../../../core/Progress/Application/DTO/CreateProgressRequest';

describe('AddProgress Use Case', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches progressive goal, saves a progress and updates the progressive goal', async () => {
    // prepare a fake progressive goal
    const progressiveGoal: any = {
      id: 'pg-1',
      goal: { id: 'g-1' },
      measureUnit: 'units',
      amount: 100,
      currentProgress: 10,
      progress: [],
      pointsEarned: 5,
      addProgress: jest.fn(function (p: any) { this.progress.push(p); }),
    };

    const getProgressiveGoal = { execute: jest.fn().mockResolvedValue(progressiveGoal) };
    const save = { save: jest.fn().mockResolvedValue(undefined) };
    const update = { save: jest.fn().mockResolvedValue(undefined) };

    const useCase = new AddProgress(getProgressiveGoal as any, save as any, update as any);

    const req: CreateProgressRequest = new CreateProgressRequest();
    req.progressiveGoalId = 'pg-1';
    req.progress = 20;
    req.date = new Date('2023-01-01');
    req.description = 'increment';

    const result = await useCase.execute(req);

    expect(getProgressiveGoal.execute).toHaveBeenCalledWith('pg-1');
    expect(save.save).toHaveBeenCalled();
    // verify addProgress was called with the saved progress
    expect(progressiveGoal.addProgress).toHaveBeenCalled();
    // update.save must be called with the progressive goal
    expect(update.save).toHaveBeenCalledWith(progressiveGoal);
    // returned value is the progressive goal instance
    expect(result).toBe(progressiveGoal);
    // ensure the progress was pushed into the progressiveGoal.progress array
    expect(progressiveGoal.progress.length).toBeGreaterThanOrEqual(1);
    const added = progressiveGoal.progress[0];
    expect(added.progress).toBe(20);
    expect(added.description).toBe('increment');
  });

  it('propagates error when getProgressiveGoal.execute throws', async () => {
    const getProgressiveGoal = { execute: jest.fn().mockRejectedValue(new Error('not found')) };
    const save = { save: jest.fn() };
    const update = { save: jest.fn() };

    const useCase = new AddProgress(getProgressiveGoal as any, save as any, update as any);

    await expect(useCase.execute({ progressiveGoalId: 'x' } as any)).rejects.toThrow('not found');
    expect(save.save).not.toHaveBeenCalled();
    expect(update.save).not.toHaveBeenCalled();
  });
});