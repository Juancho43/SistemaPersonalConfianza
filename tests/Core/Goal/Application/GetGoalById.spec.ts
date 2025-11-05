// Importa la clase que vamos a probar
import { GetGoalById } from '../../../../core/Goal/Application/GetGoalById';
// Importa la interfaz del repositorio (para tipar el mock)
import { GetGoalByIdInterface } from '../../../../core/Goal/Domain/Persistance/GetGoalByIdInterface';

describe('GetGoalById', () => {
  // Define una variable para la instancia de la clase y el repositorio mock
  let getGoalById: GetGoalById;
  let mockGoalRepository: GetGoalByIdInterface;

  // Objeto de ejemplo para simular la Goal que se recupera
  const mockGoal = {
    id: 'goal-123',
    name: 'Aprender Jest',
    target: 100,
    current: 50,
  };

  // Configuración antes de cada prueba (setup)
  // Configuración antes de cada prueba (setup)
  beforeEach(() => {
    // Crea el mock del repositorio incluyendo TODOS los métodos de la interfaz
    mockGoalRepository = {
      // Este es el método que REALMENTE usaremos y configuraremos
      getById: jest.fn(),

      // *** MÉTODOS REQUERIDOS POR LA INTERFAZ QUE DEBES INCLUIR ***
      // Aunque no los uses, deben estar presentes para que TS no falle
      save: jest.fn(),
      delete: jest.fn(),
      // Si hubiera más, también deben estar aquí
      // *************************************************************

    } as GetGoalByIdInterface; // Ahora la aserción es válida

    // Inicializa la clase a probar con el repositorio mock
    getGoalById = new GetGoalById(mockGoalRepository);
  });

  // --- Caso 1: Recuperación exitosa ---
  it('debería devolver la Goal si se encuentra por su ID', async () => {
    // 1. Configurar el mock:
    // Hacemos que getById devuelva la 'mockGoal' cuando se la llame.
    (mockGoalRepository.getById as jest.Mock).mockResolvedValue(mockGoal);

    // 2. Ejecutar el método a probar:
    const result = await getGoalById.execute(mockGoal.id);

    // 3. Afirmaciones (Assertions):
    // Verifica que el método del repositorio haya sido llamado con el ID correcto.
    expect(mockGoalRepository.getById).toHaveBeenCalledWith(mockGoal.id);
    // Verifica que el resultado devuelto sea el objeto Goal esperado.
    expect(result).toEqual(mockGoal);
  });

  // --- Caso 2: Goal no encontrada ---
  it('debería lanzar un error si la Goal no se encuentra', async () => {
    const nonExistentId = 'non-existent-id';

    // 1. Configurar el mock:
    // Hacemos que getById devuelva 'null' o 'undefined' (simulando que no se encuentra).
    (mockGoalRepository.getById as jest.Mock).mockResolvedValue(null);

    // 2. Ejecutar el método a probar y afirmar el error:
    // Usamos toThrow() para verificar que se lance un error
    await expect(getGoalById.execute(nonExistentId)).rejects.toThrow(
      'Goal not found'
    );

    // 3. Afirmaciones adicionales:
    // Verificamos que se haya intentado buscar la Goal.
    expect(mockGoalRepository.getById).toHaveBeenCalledWith(nonExistentId);
  });
});