import * as crypto from 'node:crypto';
import { CreateGoal } from '../../../core/Application/CreateGoal';
import { IGoalRepository } from '../../../core/Domain/IGoalRepository';
import { GetGoalById } from '../../../core/Application/GetGoalById';
import { Goal } from '../../../core/Domain/Goal';
import { CreateGoalRequest } from '../../../core/Application/DTO/CreateGoalRequest';

// MOCK: Mockeamos el módulo 'node:crypto' para controlar el UUID generado
jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(),
}));

describe('CreateGoal', () => {
  let createGoal: CreateGoal;
  let mockGoalRepository: IGoalRepository;
  let mockGetGoalById: GetGoalById;

  // UUID de prueba que el mock de 'randomUUID' devolverá
  const mockUUID = 'f8d1e4c7-a9b0-4d3f-9e2c-1a8b7d6f5e4c';

  // Datos de una Goal de ejemplo (para el caso de la meta padre)
  const mockParentGoal = Goal.create(
    'Meta Padre',
    99,
    'Descripción Padre',
    'parent-goal-123',
  );

  // Configuración antes de cada prueba (setup)
  beforeEach(() => {
    // 1. Configurar el mock de randomUUID para que devuelva un valor fijo
    (crypto.randomUUID as jest.Mock).mockReturnValue(mockUUID);

    // 2. Mockear IGoalRepository (incluyendo todos los métodos para cumplir con la interfaz)
    mockGoalRepository = {
      getById: jest.fn(),
      // Mockeamos 'save' para que no haga nada, solo rastreamos si fue llamado
      save: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn(),
    } as IGoalRepository;

    // 3. Mockear GetGoalById (solo necesitamos el método 'execute')
    mockGetGoalById = {
      execute: jest.fn(),
    } as unknown as GetGoalById; // Usamos 'unknown as T' para mockear solo el método 'execute'

    // 4. Inicializar la clase a probar
    createGoal = new CreateGoal(mockGoalRepository, mockGetGoalById);
  });

  // --- Caso 1: Creación de Goal simple (sin padre) ---
  it('debería crear y guardar una nueva Goal sin padre', async () => {
    // Datos de entrada
    const request: CreateGoalRequest = {
      name: 'Ahorro para el coche',
      cost: 99,
      description: 'Ahorrar para un Toyota Yaris.',
      state: 'PENDIENTE',
    };


    // 1. Ejecutar el método a probar
    const createdGoal = await createGoal.execute(request);

    // 2. Afirmaciones sobre la Goal devuelta
    expect(createdGoal).toBeInstanceOf(Goal);
    expect(createdGoal.id).toBe(mockUUID); // Verifica que tomó el ID del mock
    expect(createdGoal.nombre).toBe(request.name);
    expect(createdGoal.estado).toBe(request.state);
    expect(createdGoal.padre).toBeNull(); // Debe ser undefined/null

    // 3. Afirmaciones sobre las dependencias
    // Verifica que el método save() del repositorio fue llamado con el objeto Goal
    expect(mockGoalRepository.save).toHaveBeenCalledWith(createdGoal);
    // Verifica que NO se llamó al servicio GetGoalById
    expect(mockGetGoalById.execute).not.toHaveBeenCalled();
  });

  // --- Caso 2: Creación de Goal con un padre existente ---
  it('debería crear y guardar una nueva Goal y asignarle una Goal padre', async () => {
    const parentId = 'parent-goal-123';

    // Datos de entrada
    const request: CreateGoalRequest = {
      name: 'Ahorro de ruedas',
      cost: 99,
      description: 'Ahorro para las 4 ruedas del Yaris.',
      state: 'PENDIENTE',
      parentGoalId: parentId, // Con padre
    };

    // 1. Configurar el mock:
    // Hacemos que getById.execute devuelva la Goal padre cuando se la llame.
    (mockGetGoalById.execute as jest.Mock).mockResolvedValue(mockParentGoal);

    // 2. Ejecutar el método a probar
    const createdGoal = await createGoal.execute(request);

    // 3. Afirmaciones sobre las dependencias
    // Verifica que SÍ se llamó al servicio GetGoalById con el ID del padre
    expect(mockGetGoalById.execute).toHaveBeenCalledWith(parentId);
    // Verifica que el repositorio guardó la meta
    expect(mockGoalRepository.save).toHaveBeenCalledWith(createdGoal);

    // 4. Afirmaciones sobre la Goal devuelta
    expect(createdGoal.padre).toEqual(mockParentGoal);
    expect(createdGoal.nombre).toBe(request.name);
  });

  // --- Caso 3: Manejo de errores de GetGoalById ---
  it('debería propagar el error si GetGoalById falla al buscar el padre', async () => {
    const parentId = 'fail-id';

    // Datos de entrada (incluyendo un padre)
    const request: CreateGoalRequest = {
      name: 'Ahorro con padre inexistente',
      cost: 100,
      description: 'Test de error',
      state: 'PENDIENTE',
      parentGoalId: parentId,
    };

    // 1. Configurar el mock para que GetGoalById.execute lance un error
    (mockGetGoalById.execute as jest.Mock).mockRejectedValue(
      new Error('Goal not found'),
    );

    // 2. Ejecutar y afirmar que la promesa rechace (propague el error)
    await expect(createGoal.execute(request)).rejects.toThrow('Goal not found');

    // 3. Afirmar que NUNCA se intentó guardar la Goal
    expect(mockGoalRepository.save).not.toHaveBeenCalled();
  });
});