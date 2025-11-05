import { GoalState } from '../../../../core/Goal/Domain/GoalState';

describe('GoalState Value Object', () => {

  // --- Caso 1: Creación Válida ---
  it('debería crear el estado COMPLETADA a partir de una cadena de texto válida', () => {
    const state = GoalState.fromValue('COMPLETADA');
    expect(state).toBeInstanceOf(GoalState);
    expect(state.getValue()).toBe('COMPLETADA');
  });

  // --- Caso 2: Creación Inválida (Lanzamiento de Error) ---
  it('debería lanzar un error si se intenta crear con un valor inválido', () => {
    const invalidState = 'EN_REVISION';

    // Verifica que el método fromValue lance una excepción
    expect(() => {
      GoalState.fromValue(invalidState);
    }).toThrow(`Estado de Goal inválido: ${invalidState}. Debe ser PENDIENTE, COMPLETADA o ABANDONADA.`);
  });

  // --- Caso 3: Métodos Factory ---
  it('debería crear los estados usando los métodos factory estáticos', () => {
    expect(GoalState.PENDING().getValue()).toBe('PENDIENTE');
    expect(GoalState.COMPLETED().getValue()).toBe('COMPLETADA');
    expect(GoalState.ABANDONED().getValue()).toBe('ABANDONADA');
  });

  // --- Caso 4: Igualdad (Equality) ---
  it('debería ser igual a otro GoalState con el mismo valor, independientemente de cómo se creó', () => {
    const state1 = GoalState.fromValue('PENDIENTE');
    const state2 = GoalState.PENDING();

    // Ambos son 'PENDIENTE', deben ser iguales
    expect(state1.equals(state2)).toBe(true);
  });

  it('no debería ser igual a otro GoalState con un valor diferente', () => {
    const state1 = GoalState.PENDING();
    const state2 = GoalState.COMPLETED();

    // No son iguales
    expect(state1.equals(state2)).toBe(false);
  });
});