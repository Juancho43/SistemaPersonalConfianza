import { Goal } from '../../../../core/Goal/Domain/Goal';
import { GoalState } from '../../../../core/Goal/Domain/GoalState';
// Asumo que tu clase Goal tiene un Value Object GoalState interno,
// pero el getter 'estado' devuelve un string (para compatibilidad con DTOs).

describe('Goal Entity', () => {

  // Firma de Goal.create: create(name: string, cost: number, description: string | undefined, id: string): Goal

  // --- Caso 1: Creación Válida ---
  test('debería crearse con coste subjetivo válido, descripción opcional y estado PENDIENTE por defecto', () => {
    const name = 'Test Goal';
    const cost = 50;
    const description = 'Una meta de prueba';
    const id = '123-uuid-test';
    const type = 'BASICA'
    // Ejecución con todos los parámetros
    const goal = Goal.create(name, cost, type, description, id);

    // Afirmaciones
    expect(goal.id).toBe(id);
    expect(goal.nombre).toBe(name);
    expect(goal.coste_subjetivo).toBe(cost);
    expect(goal.descripcion).toBe(description);
    // Verifica el valor por defecto
    expect(goal.estado).toBe('PENDIENTE');
    expect(goal.penalizacion_restada).toBe(0);

    // Ejecución con descripción opcional omitida
    const goalNoDesc = Goal.create(name, cost, 'BASICA',undefined, '456');
    expect(goalNoDesc.descripcion).toBeUndefined();
  });

  // --- Caso 2: Validación de Rango de Coste Subjetivo ---
  test('debería lanzar un error cuando coste_subjetivo está fuera del rango [1-100]', () => {
    const name = 'Invalid Goal';
    const description = 'Testing validation';
    const id = 'invalid-id';

    // Coste demasiado bajo
    expect(() => Goal.create(name, 0, description, id)).toThrow(
      'El Coste Subjetivo debe estar entre 1 y 100.',
    );

    // Coste demasiado alto
    expect(() => Goal.create(name, 101, description, id)).toThrow(
      'El Coste Subjetivo debe estar entre 1 y 100.',
    );
  });

  // --- Caso 3: Abandono Válido (desde PENDIENTE) ---
  test('marcar_abandonada establece el estado a ABANDONADA y aplica una penalización del 50% si el estado era PENDIENTE', () => {
    const cost = 80;
    const goal = Goal.create('Abandon Me', cost, 'BASICA','Desc', 'abandon-id');

    // Inicialización
    expect(goal.estado).toBe('PENDIENTE');
    expect(goal.penalizacion_restada).toBe(0);

    // Acción
    goal.marcar_abandonada();

    // Afirmaciones
    expect(goal.estado).toBe('ABANDONADA');
    // 50% de 80 es 40
    expect(goal.penalizacion_restada).toBeCloseTo(40);
  });

  // --- Caso 4: Abandono Inválido (Estado Incorrecto) ---
  test('marcar_abandonada no debe hacer nada (ni cambiar estado ni penalizar) si el estado no es PENDIENTE', () => {
    const cost = 30;
    const goal = Goal.create('No Change', cost, 'BASICA','Desc', 'no-change-id');

    // Forzamos un estado que no es PENDIENTE (usando el setter refactorizado)
    goal.estado = GoalState.COMPLETED();
    expect(goal.estado).toBe('COMPLETADA');

    // Acción
    goal.marcar_abandonada();

    // Afirmaciones
    // El estado sigue siendo COMPLETADA
    expect(goal.estado).toBe('COMPLETADA');
    // La penalización debe seguir siendo 0
    expect(goal.penalizacion_restada).toBe(0);
  });


});
// ... sección de tests existentes ...

describe('Goal Entity - Completar Meta', () => {

  // Helper para crear una Goal simulada (simulando la estructura de submetas)
  const createGoalMock = (id: string, cost: number, submetas: Goal[] = [], estado: string = 'PENDIENTE'): Goal => {
    // Necesitamos crear un mock que simule la Goal con sus submetas
    // Usamos la implementación de Goal.create, y luego forzamos el estado y submetas
    const goal = Goal.create(`Goal ${id}`, cost, 'BASICA',`Desc ${id}`, id);

    // @ts-ignore: Acceso a propiedades privadas simuladas para el test
    goal._submetas = submetas;
    goal.estado =GoalState.fromValue(estado); // Asigna el estado inicial

    return goal;
  };

  // CA 2.1 y CA 2.3: Completar una submeta o una meta principal simple
  test('marcar_completada debe establecer puntos_ganados igual al Coste Subjetivo (CS)', () => {
    const cs = 40;
    const goal = createGoalMock('simple-1', cs, []);

    // Acción
    const puntos = goal.markAsComplete();

    // Afirmaciones
    expect(goal.estado).toBe('COMPLETADA');
    expect(puntos).toBe(cs);
    expect(goal.puntos_ganados).toBe(cs);
  });

  // CA 2.2: Validación de Meta Principal con submetas pendientes
  test('debería lanzar un error si la Meta Principal tiene submetas PENDIENTES (CA 2.2)', () => {
    // Submeta Pendiente (estado por defecto)
    const submetaPendiente = createGoalMock('sub-6', 10);

    // Meta Principal con la submeta pendiente
    const metaPrincipal = createGoalMock('principal-1', 40, [submetaPendiente]);

    // Afirmación: El método debe lanzar un error
    expect(() => {
      metaPrincipal.markAsComplete();
    }).toThrow('No se puede completar la Meta Principal. Todas las submetas deben estar completadas.');

    // El estado de la meta principal NO debe cambiar
    expect(metaPrincipal.estado).toBe('PENDIENTE');
    expect(metaPrincipal.puntos_ganados).toBe(0);
  });

  // CA 2.3: Finalización Exitosa de Meta Principal
  test('marcar_completada debe funcionar si la Meta Principal tiene todas sus submetas COMPLETADAS', () => {
    const csPrincipal = 40;

    // Submetas completadas
    const submeta1 = createGoalMock('sub-comp-1', 10, [], 'COMPLETADA');
    const submeta2 = createGoalMock('sub-comp-2', 20, [], 'COMPLETADA');

    // Meta Principal con submetas completadas
    const metaPrincipal = createGoalMock('principal-2', csPrincipal, [submeta1, submeta2]);

    // Acción
    const puntos = metaPrincipal.markAsComplete();

    // Afirmaciones
    expect(metaPrincipal.estado).toBe('COMPLETADA');
    // El NC (puntos) debe aumentar en el CS de la principal (40)
    expect(puntos).toBe(csPrincipal);
    expect(metaPrincipal.puntos_ganados).toBe(csPrincipal);
  });

  // Test Adicional: Caso límite - Sin submetas pero es principal (debería funcionar)
  test('marcar_completada debe funcionar si la meta es principal pero no tiene submetas', () => {
    const cs = 50;
    const goal = createGoalMock('solo-principal', cs, []);

    // Acción
    const puntos = goal.markAsComplete();

    // Afirmaciones
    expect(goal.estado).toBe('COMPLETADA');
    expect(puntos).toBe(cs);
  });
  test('debería permitir completar la Meta Principal solo después de completar todas las Submetas (Flujo CA 2.3)', () => {
    const csPrincipal = 100;
    const csSub1 = 30;
    const csSub2 = 50;

    // 1. Crear Submetas (PENDIENTE por defecto)
    const submeta1 = createGoalMock('sub-seq-1', csSub1);
    const submeta2 = createGoalMock('sub-seq-2', csSub2);

    // 2. Crear Meta Principal con ambas submetas
    const metaPrincipal = createGoalMock('principal-seq', csPrincipal, [submeta1, submeta2]);

    // --- Paso A: Intentar completar la principal mientras hay pendientes (Debe fallar) ---
    expect(metaPrincipal.estado).toBe('PENDIENTE');

    // Debe lanzar el error de validación (CA 2.2)
    expect(() => {
      metaPrincipal.markAsComplete();
    }).toThrow('No se puede completar la Meta Principal. Todas las submetas deben estar completadas.');

    // --- Paso B: Completar la primera submeta ---
    const puntosSub1 = submeta1.markAsComplete();
    expect(submeta1.estado).toBe('COMPLETADA');
    expect(submeta1.puntos_ganados).toBe(csSub1); // Verifica puntos ganados de la submeta

    // --- Paso C: Intentar completar la principal con UNA pendiente (Debe seguir fallando) ---
    expect(() => {
      metaPrincipal.markAsComplete();
    }).toThrow('No se puede completar la Meta Principal. Todas las submetas deben estar completadas.');

    // --- Paso D: Completar la segunda submeta ---
    const puntosSub2 = submeta2.markAsComplete();
    expect(submeta2.estado).toBe('COMPLETADA');
    expect(submeta2.puntos_ganados).toBe(csSub2);

    // --- Paso E: Completar la Meta Principal (Debe ser exitoso - CA 2.3) ---
    const puntosPrincipal = metaPrincipal.markAsComplete();

    // Afirmaciones finales
    expect(metaPrincipal.estado).toBe('COMPLETADA');
    // Verifica que se acumulen los puntos de la principal (CS=100)
    expect(puntosPrincipal).toBe(csPrincipal);
    expect(metaPrincipal.puntos_ganados).toBe(csPrincipal);
  });
});