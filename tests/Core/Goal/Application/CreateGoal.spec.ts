import { CreateGoal } from '../../../../core/Goal/Application/CreateGoal';
import { CreateGoalInterface } from '../../../../core/Goal/Domain/Persistance/CreateGoalInterface';
import { GetGoalById } from '../../../../core/Goal/Application/GetGoalById';
import { GetProfileById } from '../../../../core/Profile/Application/GetProfileById';
import { Goal } from '../../../../core/Goal/Domain/Goal';
import { GoalState } from '../../../../core/Goal/Domain/GoalState';

describe('CreateGoal', () => {
  let mockRepository: jest.Mocked<CreateGoalInterface>;
  let mockGetGoalById: jest.Mocked<GetGoalById>;
  let mockGetProfileById: jest.Mocked<GetProfileById>;
  let createGoal: CreateGoal;

  beforeEach(() => {
    mockRepository = { save: jest.fn() } as unknown as jest.Mocked<CreateGoalInterface>;
    mockGetGoalById = { execute: jest.fn() } as unknown as jest.Mocked<GetGoalById>;
    mockGetProfileById = { execute: jest.fn() } as unknown as jest.Mocked<GetProfileById>;
    createGoal = new CreateGoal(mockRepository, mockGetGoalById, mockGetProfileById);
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('creates a goal, assigns profile and state, adds it to profile, saves it and returns it', async () => {
    const profileMock = { id: 'profile-123', addGoal: jest.fn() };
    mockGetProfileById.execute.mockResolvedValue(profileMock as any);

    const createdState = { value: 'PENDIENTE' } as any;
    const fakeGoal = { profile: undefined, estado: undefined, padre: undefined } as any;

    const goalCreateSpy = jest.spyOn(Goal, 'create').mockReturnValue(fakeGoal);
    const stateSpy = jest.spyOn(GoalState, 'fromValue').mockReturnValue(createdState);

    const request = {
      name: 'My goal',
      cost: 100,
      type: 'BASICA',
      description: 'Desc',
      state: 'PENDIENTE',
      profileId: 'profile-123',
    } as any;

    const result = await createGoal.execute(request);

    expect(mockGetProfileById.execute).toHaveBeenCalledWith('profile-123');
    expect(stateSpy).toHaveBeenCalledWith('PENDIENTE');
    expect(goalCreateSpy).toHaveBeenCalledWith('My goal', 100, 'BASICA', 'Desc', expect.any(String));

    expect(fakeGoal.profile).toBe(profileMock);
    expect(fakeGoal.estado).toBe(createdState);
    expect(profileMock.addGoal).toHaveBeenCalledWith(fakeGoal);
    expect(mockRepository.save).toHaveBeenCalledWith(fakeGoal);
    expect(result).toBe(fakeGoal);
  });

  it('fetches and assigns parent when parentGoalId is provided', async () => {
    const profileMock = { id: 'p1', addGoal: jest.fn() };
    mockGetProfileById.execute.mockResolvedValue(profileMock as any);

    const parentGoal = { id: 'parent-1' } as any;
    mockGetGoalById.execute.mockResolvedValue(parentGoal);

    const fakeGoal = { padre: undefined } as any;
    jest.spyOn(Goal, 'create').mockReturnValue(fakeGoal);
    jest.spyOn(GoalState, 'fromValue').mockReturnValue('STATE' as any);

    const request = {
      name: 'Child',
      cost: 10,
      type: 'BASICA',
      description: 'D',
      state: 'PENDIENTE',
      profileId: 'p1',
      parentGoalId: 'parent-1',
    } as any;

    const result = await createGoal.execute(request);

    expect(mockGetGoalById.execute).toHaveBeenCalledWith('parent-1');
    expect(fakeGoal.padre).toBe(parentGoal);
    expect(result).toBe(fakeGoal);
  });

  it('does not fetch parent when parentGoalId is undefined', async () => {
    const profileMock = { id: 'p1', addGoal: jest.fn() };
    mockGetProfileById.execute.mockResolvedValue(profileMock as any);

    const fakeGoal = { padre: undefined } as any;
    jest.spyOn(Goal, 'create').mockReturnValue(fakeGoal);
    jest.spyOn(GoalState, 'fromValue').mockReturnValue('STATE' as any);

    const request = {
      name: 'No parent',
      cost: 5,
      type: 'BASICA',
      description: 'D',
      state: 'PENDIENTE',
      profileId: 'p1',
    } as any;

    await createGoal.execute(request);

    expect(mockGetGoalById.execute).not.toHaveBeenCalled();
    expect(fakeGoal.padre).toBeUndefined();
  });

  it('calls GetGoalById when parentGoalId is null and assigns the returned goal', async () => {
    const profileMock = { id: 'p1', addGoal: jest.fn() };
    mockGetProfileById.execute.mockResolvedValue(profileMock as any);

    const parentGoal = { id: 'parent-null' } as any;
    mockGetGoalById.execute.mockResolvedValue(parentGoal);

    const fakeGoal = { padre: undefined } as any;
    jest.spyOn(Goal, 'create').mockReturnValue(fakeGoal);
    jest.spyOn(GoalState, 'fromValue').mockReturnValue('STATE' as any);

    const request = {
      name: 'Null parent id',
      cost: 20,
      type: 'BASICA',
      description: 'D',
      state: 'PENDIENTE',
      profileId: 'p1',
      parentGoalId: null,
    } as any;

    const created = await createGoal.execute(request);

    expect(mockGetGoalById.execute).toHaveBeenCalledWith(null);
    expect(created.padre).toBe(parentGoal);
  });

  it('propagates the error when repository save fails', async () => {
    const profileMock = { id: 'p1', addGoal: jest.fn() };
    mockGetProfileById.execute.mockResolvedValue(profileMock as any);
    mockRepository.save.mockRejectedValue(new Error('DB fail'));

    const fakeGoal = {} as any;
    jest.spyOn(Goal, 'create').mockReturnValue(fakeGoal);
    jest.spyOn(GoalState, 'fromValue').mockReturnValue('STATE' as any);

    const request = {
      name: 'Save fails',
      cost: 1,
      type: 'BASICA',
      description: 'D',
      state: 'PENDIENTE',
      profileId: 'p1',
    } as any;

    await expect(createGoal.execute(request)).rejects.toThrow('DB fail');
    expect(profileMock.addGoal).toHaveBeenCalledWith(fakeGoal);
    expect(mockRepository.save).toHaveBeenCalledWith(fakeGoal);
  });

  it('propagates the error when profile lookup fails', async () => {
    jest.spyOn(Goal, 'create').mockReturnValue({} as any);
    mockGetProfileById.execute.mockRejectedValue(new Error('Profile not found'));

    const request = {
      name: 'Profile error',
      cost: 1,
      type: 'BASICA',
      description: 'D',
      state: 'PENDIENTE',
      profileId: 'missing',
    } as any;

    await expect(createGoal.execute(request)).rejects.toThrow('Profile not found');
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});