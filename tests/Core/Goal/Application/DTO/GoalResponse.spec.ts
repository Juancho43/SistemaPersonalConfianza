import { Goal } from '../../../../../core/Goal/Domain/Goal';
import { GoalResponse } from '../../../../../core/Goal/Application/DTO/GoalResponse';

describe('GoalResponse mapping', () => {
  it('maps a single goaleable to a response shape', () => {
    const goaleable = {
      getId: () => 'id-1',
      getGoal: () => ({
        nombre: 'Title',
        coste_subjetivo: 42,
        descripcion: 'Desc',
        puntos_ganados: 7,
        penalizacion_restada: 0,
        submetas: [],
      }),
      getState: () => ({ getValue: () => 'PENDIENTE' }),
    };

    const result = GoalResponse.generate(goaleable as any);
    expect(result.id).toBe('id-1');
    expect(result.title).toBe('Title');
    expect(result.cost).toBe(42);
    expect(result.description).toBe('Desc');
    expect(result.state).toBe('PENDIENTE');
    expect(result.earnedPoints).toBe(7);
    expect(result.penaltyApplied).toBe(0);
    expect(Array.isArray(result.goals)).toBe(true);
    expect(result.goals.length).toBe(0);
  });

  it('recursively maps nested submetas', () => {
    const sub = {
      getId: () => 'sub-1',
      getGoal: () => ({
        nombre: 'SubTitle',
        coste_subjetivo: 1,
        descripcion: undefined,
        puntos_ganados: 0,
        penalizacion_restada: 0,
        submetas: undefined,
      }),
      getState: () => ({ getValue: () => 'ABANDONADA' }),
    };

    const parent = {
      getId: () => 'p-1',
      getGoal: () => ({
        nombre: 'Parent',
        coste_subjetivo: 100,
        descripcion: 'parent desc',
        puntos_ganados: 50,
        penalizacion_restada: 5,
        submetas: [sub],
      }),
      getState: () => ({ getValue: () => 'COMPLETADA' }),
    };

    const result = GoalResponse.generate(parent as any);
    expect(result.id).toBe('p-1');
    expect(result.title).toBe('Parent');
    expect(result.goals).toHaveLength(1);

    const mappedSub = result.goals[0];
    expect(mappedSub.id).toBe('sub-1');
    expect(mappedSub.title).toBe('SubTitle');
    expect(mappedSub.cost).toBe(1);
    expect(mappedSub.description).toBeUndefined();
    expect(mappedSub.state).toBe('ABANDONADA');
    expect(Array.isArray(mappedSub.goals)).toBe(true);
  });
});