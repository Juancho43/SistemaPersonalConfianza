import { Goal } from '../../../../../core/Goal/Domain/Goal';
import { GoalResponse } from '../../../../../core/Goal/Application/DTO/GoalResponse';

describe('GoalResponse', () => {
  // Objeto Goal simulado para las pruebas.
  // Usamos un mock basado en la estructura que esperaríamos de la clase Goal
  const mockGoal: Goal = {
    // Propiedades de ejemplo que esperamos que Goal tenga
    id: 'goal-456',
    nombre: 'Comprar una casa',
    coste_subjetivo: 100,
    descripcion: 'Ahorro para el enganche de una casa en la ciudad.',
    estado: 'PENDIENTE',

    // Propiedades adicionales (que no deben aparecer en la respuesta)
    padre: null,
    // (Asumimos que Goal.ts define el resto de los métodos y propiedades)
    // Para TypeScript, si Goal es una clase, necesitaríamos un mock más completo
    // o tipar este objeto como 'Partial<Goal>' o 'any'.
    // Usaremos 'as Goal' asumiendo que el resto de los métodos no son relevantes para este test.
  } as Goal;

  it('debería mapear correctamente un objeto Goal a la estructura de respuesta (GoalResponse)', () => {
    // 1. Ejecutar el método estático a probar
    const response = GoalResponse.generate(mockGoal);

    // 2. Afirmaciones sobre el resultado
    // Verifica que el resultado sea un objeto
    expect(typeof response).toBe('object');
    // Verifica que el objeto tenga las claves correctas (ID, Title, Cost, etc.)
    expect(Object.keys(response)).toEqual([
      'id',
      'title',
      'cost',
      'description',
      'state',
    ]);

    // 3. Afirmaciones sobre el mapeo de datos
    expect(response.id).toBe(mockGoal.id);
    // Verifica el cambio de nombre de 'nombre' a 'title'
    expect(response.title).toBe(mockGoal.nombre);
    // Verifica el cambio de nombre de 'coste_subjetivo' a 'cost'
    expect(response.cost).toBe(mockGoal.coste_subjetivo);
    expect(response.description).toBe(mockGoal.descripcion);
    expect(response.state).toBe(mockGoal.estado);
  });

  // --- Caso opcional: Manejo de campos nulos o undefined ---
  it('debería manejar campos nulos o indefinidos en la Goal (ej. descripcion)', () => {
    const goalWithNoDesc = {
      ...mockGoal,
    descripcion: undefined,
    } as Goal;


    const response = GoalResponse.generate(goalWithNoDesc);

    // Verifica que la descripción siga siendo undefined en la respuesta
    expect(response.description).toBeUndefined();
    // Y que el resto de los campos sigan siendo correctos
    expect(response.title).toBe(mockGoal.nombre);
  });
});