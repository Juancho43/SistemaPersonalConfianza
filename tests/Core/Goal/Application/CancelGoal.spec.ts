// `core/Goal/Application/CompleteGoal.spec.ts`
import { CancelGoal } from '../../../../core/Goal/Application/CancelGoal'


describe('CancelGoal Use Case', () => {
  let saveGoal: any;
  let getProfile: any;
  let saveProfile: any;

  beforeEach(() => {
    saveGoal = { save: jest.fn().mockResolvedValue(undefined) };
    getProfile = { execute: jest.fn() };
    saveProfile = { save: jest.fn().mockResolvedValue(undefined) };
  });

  it('cancels the goal, saves canceled goal and its submetas, saves profile and returns totalConfidence', async () => {
    const subGoalObj = { id: 'sub-1' };
    const submeta = { getGoal: jest.fn().mockReturnValue(subGoalObj) };
    const canceledGoal = { id: 'g1', submetas: [submeta] };
    const profile = {
      cancelGoal: jest.fn().mockReturnValue(canceledGoal),
      totalConfidence: 77,
    };
    getProfile.execute.mockResolvedValue(profile);

    const useCase = new CancelGoal(saveGoal, getProfile, saveProfile);
    const result = await useCase.execute({ profileId: 'pX', goalId: 'g1' });

    expect(getProfile.execute).toHaveBeenCalledWith('pX');
    expect(profile.cancelGoal).toHaveBeenCalledWith('g1');
    expect(saveGoal.save).toHaveBeenCalledWith(canceledGoal);
    expect(submeta.getGoal).toHaveBeenCalled();
    expect(saveGoal.save).toHaveBeenCalledWith(subGoalObj);
    expect(saveProfile.save).toHaveBeenCalledWith(profile);
    expect(result).toBe(77);
  });

  it('handles canceled goal without submetas by saving only the canceled goal and profile', async () => {
    const canceledGoal = { id: 'g2', submetas: [] };
    const profile = {
      cancelGoal: jest.fn().mockReturnValue(canceledGoal),
      totalConfidence: 10,
    };
    getProfile.execute.mockResolvedValue(profile);

    const useCase = new CancelGoal(saveGoal, getProfile, saveProfile);
    const result = await useCase.execute({ profileId: 'pY', goalId: 'g2' });

    expect(getProfile.execute).toHaveBeenCalledWith('pY');
    expect(profile.cancelGoal).toHaveBeenCalledWith('g2');
    expect(saveGoal.save).toHaveBeenCalledTimes(1);
    expect(saveGoal.save).toHaveBeenCalledWith(canceledGoal);
    expect(saveProfile.save).toHaveBeenCalledWith(profile);
    expect(result).toBe(10);
  });

  it('propagates error when getProfile.execute rejects', async () => {
    getProfile.execute.mockRejectedValue(new Error('profile missing'));

    const useCase = new CancelGoal(saveGoal, getProfile, saveProfile);
    await expect(useCase.execute({ profileId: 'missing', goalId: 'g' })).rejects.toThrow('profile missing');

    expect(saveGoal.save).not.toHaveBeenCalled();
    expect(saveProfile.save).not.toHaveBeenCalled();
  });
});