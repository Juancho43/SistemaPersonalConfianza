// `core/Goal/Application/CompleteGoal.spec.ts`
import { CompleteGoal } from '../../../../core/Goal/Application/CompleteGoal'

describe('CompleteGoal Use Case', () => {
  let profileById: any;
  let profileRepository: any;
  let goalSaveRepository: any;

  beforeEach(() => {
    profileById = { execute: jest.fn() };
    profileRepository = { save: jest.fn().mockResolvedValue(undefined) };
    goalSaveRepository = { save: jest.fn().mockResolvedValue(undefined) };
  });

  it('completes the goal, saves the goal and profile, and returns profile totalConfidence', async () => {
    const fakeGoal = { id: 'goal-1' };
    const profile = {
      completeGoal: jest.fn().mockReturnValue(fakeGoal),
      totalConfidence: 123,
    };
    profileById.execute.mockResolvedValue(profile);

    const useCase = new CompleteGoal(profileById, profileRepository, goalSaveRepository);
    const result = await useCase.execute({ profileId: 'p1', goalId: 'g1' });

    expect(profileById.execute).toHaveBeenCalledWith('p1');
    expect(profile.completeGoal).toHaveBeenCalledWith('g1');
    expect(goalSaveRepository.save).toHaveBeenCalledWith(fakeGoal);
    expect(profileRepository.save).toHaveBeenCalledWith(profile);
    expect(result).toBe(123);
  });

  it('propagates error when profile.completeGoal throws (goal not found or invalid)', async () => {
    const profile = {
      completeGoal: jest.fn().mockImplementation(() => { throw new Error('goal not found'); }),
      totalConfidence: 0,
    };
    profileById.execute.mockResolvedValue(profile);

    const useCase = new CompleteGoal(profileById, profileRepository, goalSaveRepository);
    await expect(useCase.execute({ profileId: 'p1', goalId: 'missing' })).rejects.toThrow('goal not found');

    // ensure no profile save happened when completion failed
    expect(profileRepository.save).not.toHaveBeenCalled();
    expect(goalSaveRepository.save).not.toHaveBeenCalled();
  });
});