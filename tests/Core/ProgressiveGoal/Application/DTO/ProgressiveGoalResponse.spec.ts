// File: `tests/Core/ProgressiveGoal/Application/DTO/ProgressiveGoalResponse.spec.ts`
import { ProgressiveGoalResponse } from '../../../../../core/ProgressiveGoal/Application/DTO/ProgressiveGoalResponse';
import * as GoalResponseModule from '../../../../../core/Goal/Application/DTO/GoalResponse';
import * as ProgressResponseModule from '../../../../../core/Progress/Application/DTO/ProgressResponse';

describe('ProgressiveGoalResponse.generate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('maps fields and delegates goal/progress mapping', () => {
    const fakeGoal = { id: 'g-1' };
    const fakeProgress1 = { id: 'p1' };
    const fakeProgress2 = { id: 'p2' };

    jest.spyOn(GoalResponseModule.GoalResponse, 'generate').mockReturnValue({ mapped: 'goal' } as any);
    // Return a full ProgressResponse-shaped object to satisfy TypeScript
    jest.spyOn(ProgressResponseModule.ProgressResponse, 'generate').mockImplementation((p: any) => ({
      id: p.id,
      progress: 0,
      date: undefined,
      description: undefined,
    }));

    const progressiveGoal: any = {
      id: 'pg-1',
      goal: fakeGoal,
      measureUnit: 'kg',
      amount: 10,
      currentProgress: 3,
      progress: [fakeProgress1, fakeProgress2],
      pointsEarned: 7,
      remainingProgress: () => 7,
    };

    const res = ProgressiveGoalResponse.generate(progressiveGoal);

    expect(res.id).toBe('pg-1');
    expect(res.goal).toEqual({ mapped: 'goal' });
    expect(res.measureUnit).toBe('kg');
    expect(res.amount).toBe(10);
    expect(res.currentProgress).toBe(3);
    expect(res.progress).toEqual([{ id: 'p1', progress: 0, date: undefined, description: undefined }, { id: 'p2', progress: 0, date: undefined, description: undefined }]);
    expect(res.pointsEarned).toBe(7);
    expect(res.pointsRemaining).toBe(7);

    expect(GoalResponseModule.GoalResponse.generate).toHaveBeenCalledWith(fakeGoal);
    expect(ProgressResponseModule.ProgressResponse.generate).toHaveBeenCalledTimes(2);
  });

  it('uses empty id when missing and maps empty progress array', () => {
    jest.spyOn(GoalResponseModule.GoalResponse, 'generate').mockReturnValue({ mapped: 'goal' } as any);
    jest.spyOn(ProgressResponseModule.ProgressResponse, 'generate').mockReturnValue({ id: '', progress: 0, date: undefined, description: undefined } as any);

    const progressiveGoal: any = {
      // id omitted
      goal: { id: 'g' },
      measureUnit: 'u',
      amount: 1,
      currentProgress: 0,
      progress: [],
      pointsEarned: 0,
      remainingProgress: () => 1,
    };

    const res = ProgressiveGoalResponse.generate(progressiveGoal);

    expect(res.id).toBe('');
    expect(Array.isArray(res.progress)).toBe(true);
    expect(res.progress.length).toBe(0);
  });
});
