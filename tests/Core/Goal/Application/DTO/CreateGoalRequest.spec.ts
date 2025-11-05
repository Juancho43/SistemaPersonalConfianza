import { CreateGoalRequest } from '../../../../../core/Goal/Application/DTO/CreateGoalRequest';

describe('CreateGoalRequest', () => {
  const name = 'Vacaciones en el Caribe';
  const cost = 3500;
  const description = 'Ahorrar para el viaje de verano.';
  const parentGoalId = 'parent-goal-456';

  // --- Caso 1: Inicialización con todos los parámetros opcionales ---
  it('debería inicializarse correctamente con todos los parámetros', () => {
    const request = new CreateGoalRequest(
      name,
      cost,
      description,
      'ABANDONADA',
      parentGoalId,
    );

    // Verificaciones
    expect(request.name).toBe(name);
    expect(request.cost).toBe(cost);
    expect(request.description).toBe(description);
    expect(request.state).toBe('ABANDONADA');
    expect(request.parentGoalId).toBe(parentGoalId);
  });

  // --- Caso 2: Inicialización con solo parámetros requeridos y valores por defecto ---
  it('debería usar el valor por defecto "PENDIENTE" para el estado cuando no se provee', () => {
    // Solo proveemos los campos requeridos
    const request = new CreateGoalRequest(name, cost);

    // Verificaciones
    expect(request.name).toBe(name);
    expect(request.cost).toBe(cost);
    // Verifica que los valores opcionales no provistos sean undefined/por defecto
    expect(request.description).toBeUndefined();
    expect(request.parentGoalId).toBeUndefined();
    // Verifica el valor por defecto
    expect(request.state).toBe('PENDIENTE');
  });
});