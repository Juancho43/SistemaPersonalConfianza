import { CreateProgressiveGoal } from '../../../../core/ProgressiveGoal/Application/CreateProgressiveGoal';
import { CreateProgressiveGoalRequest } from '../../../../core/ProgressiveGoal/Application/DTO/CreateProgressiveGoalRequest';

describe('CreateProgressiveGoal Use Case', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates a progressive goal using CreateGoal and persists it', async () => {
    const fakeGoal = { id: 'g-xyz', nombre: 'GoalX' };
    const createGoal = { execute: jest.fn().mockResolvedValue(fakeGoal) };
    const progressiveGoalInterface = { save: jest.fn().mockResolvedValue(undefined) };

    const useCase = new CreateProgressiveGoal(createGoal as any, progressiveGoalInterface as any);

    const req = new CreateProgressiveGoalRequest();
    req.goal = { name: 'inner' } as any;
    req.measureUnit = 'meters';
    req.amount = 42;

    const result = await useCase.execute(req);

    expect(createGoal.execute).toHaveBeenCalledWith(req.goal);
    expect(progressiveGoalInterface.save).toHaveBeenCalledWith(expect.objectContaining({
      goal: fakeGoal,
      measureUnit: 'meters',
      amount: 42,
    }));
    // returned progressive goal should have the goal and provided fields
    expect(result.goal).toBe(fakeGoal);
    expect(result.measureUnit).toBe('meters');
    expect(result.amount).toBe(42);
    expect(result.id).toBeDefined();
  });

  it('propagates errors from CreateGoal', async () => {
    const createGoal = { execute: jest.fn().mockRejectedValue(new Error('create failed')) };
    const progressiveGoalInterface = { save: jest.fn() };
    const useCase = new CreateProgressiveGoal(createGoal as any, progressiveGoalInterface as any);
    const req = new CreateProgressiveGoalRequest();
    req.goal = {} as any;
    req.measureUnit = 'u';
    req.amount = 1;

    await expect(useCase.execute(req)).rejects.toThrow('create failed');
    expect(progressiveGoalInterface.save).not.toHaveBeenCalled();
  });
});