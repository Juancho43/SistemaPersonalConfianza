// tests/Core/Goal/Application/DTO/UpdateGoal.spec.ts
import { UpdateGoal } from '../../../../core/Goal/Application/UpdateGoal'
import { UpdateGoalRequest } from '../../../../core/Goal/Application/DTO/UpdateGoalRequest';

describe('UpdateGoal Use Case', () => {
  let saveGoal: any
  let getProfile: any
  let saveProfile: any

  beforeEach(() => {
    saveGoal = { save: jest.fn().mockResolvedValue(undefined) }
    getProfile = { execute: jest.fn() }
    saveProfile = { save: jest.fn().mockResolvedValue(undefined) }
  })

  it('updates goal cost, name and description, saves profile and goal, and returns updated goal', async () => {
    const goal = { id: 'g1', cost: 50, nombre: '', descripcion: '' }
    const profile = {
      updateGoalSubjectiveCost: jest.fn().mockReturnValue(goal),
    }
    getProfile.execute.mockResolvedValue(profile)

    const request = {
      profileId: 'p1',
      id: 'g1',
      goal: {
        cost: 75,
        name: 'New Name',
        description: 'New Desc',
        state: 'PENDIENTE',
        type: 'BASICA',
        profileId: 'p1',
      },
    } as UpdateGoalRequest

    const useCase = new UpdateGoal(saveGoal, getProfile, saveProfile)
    const result = await useCase.execute(request)

    expect(getProfile.execute).toHaveBeenCalledWith('p1')
    expect(profile.updateGoalSubjectiveCost).toHaveBeenCalledWith('g1', 75)
    expect(goal.nombre).toBe('New Name')
    expect(goal.descripcion).toBe('New Desc')
    expect(saveProfile.save).toHaveBeenCalledWith(profile)
    expect(saveGoal.save).toHaveBeenCalledWith(goal)
    expect(result).toBe(goal)
  })

  it('propagates error when getProfile.execute rejects and does not save', async () => {
    getProfile.execute.mockRejectedValue(new Error('profile missing'))

    const useCase = new UpdateGoal(saveGoal, getProfile, saveProfile)
    await expect(
      useCase.execute({
        id: 'g1',
        goal: {
          cost: 10,
          name: 'n',
          description: 'd',
          state: 'PENDIENTE',
          type: 'BASICA',
          profileId: 'px',
        },
      }),
    ).rejects.toThrow('profile missing');

    expect(saveProfile.save).not.toHaveBeenCalled()
    expect(saveGoal.save).not.toHaveBeenCalled()
  })

  it('propagates error when profile.updateGoalSubjectiveCost throws and does not save', async () => {
    const profile = {
      updateGoalSubjectiveCost: jest.fn().mockImplementation(() => {
        throw new Error('goal not found')
      }),
    }
    getProfile.execute.mockResolvedValue(profile)

    const useCase = new UpdateGoal(saveGoal, getProfile, saveProfile)
    await expect(
      useCase.execute({
        id: 'missing',
        goal: {
        profileId: 'p1',
          cost: 1,
          name: 'n',
          description: 'd',
          state: 'PENDIENTE',
          type: 'BASICA',
        },
      }),
    ).rejects.toThrow('goal not found');

    expect(saveProfile.save).not.toHaveBeenCalled()
    expect(saveGoal.save).not.toHaveBeenCalled()
  })

  it('accepts undefined description, updates fields, saves and returns the goal', async () => {
    const goal = { id: 'g2', cost: 20, nombre: '', descripcion: 'old' }
    const profile = {
      updateGoalSubjectiveCost: jest.fn().mockReturnValue(goal),
    }
    getProfile.execute.mockResolvedValue(profile)

    const request = {
      profileId: 'p2',
      id: 'g2',
      goal: { cost: 30, name: 'Name' as string, /* description omitted */ },
    }

    const useCase = new UpdateGoal(saveGoal, getProfile, saveProfile)
    const result = await useCase.execute(request as any)

    expect(profile.updateGoalSubjectiveCost).toHaveBeenCalledWith('g2', 30)
    expect(goal.nombre).toBe('Name')
    expect(goal.descripcion).toBeUndefined()
    expect(saveProfile.save).toHaveBeenCalledWith(profile)
    expect(saveGoal.save).toHaveBeenCalledWith(goal)
    expect(result).toBe(goal)
  })
})
