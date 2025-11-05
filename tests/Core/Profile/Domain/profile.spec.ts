// Mocks necesarios para simular el comportamiento de Goal
// Asumo que Goal tiene al menos los métodos y propiedades necesarios para el test.
import { Goal } from '../../../../core/Goal/Domain/Goal';
import { Profile } from '../../../../core/Profile/Domain/Profile';
import { GoalState } from '../../../../core/Goal/Domain/GoalState';

const createMockGoal = (id: string, cost: number, completed: boolean = false): Goal => {
  // Usamos Goal.create para simular la Goal real
  const goal = Goal.create(`Goal ${id}`, cost, `Desc ${id}`, id);

  // Asignamos las propiedades necesarias para la simulación
  // Nota: En un entorno real, solo usarías métodos públicos aquí.
  goal.puntos_ganados = completed ? cost : 0;

    return goal;
};

describe('Profile Entity', () => {
  let profile: Profile;

  beforeEach(() => {
    // Inicializa el perfil antes de cada prueba
     profile = Profile.create("Guest");
  });

  // --- Caso 1: Inicialización ---
  it('debería inicializarse con valores por defecto', () => {
    expect(profile.name).toBe('Guest');
    expect(profile.totalConfidence).toBe(0);
    expect(profile.goals).toEqual([]);
  });

  // --- Caso 2: Suma de Puntos de Confianza (Total Confidence) ---
  it('debería sumar los puntos ganados de la Goal al Total Confidence cuando se completa', () => {
    const goal1Puntos = 50;
    const goal2Puntos = 30;

    // 1. Crea y añade las Goals. Estas están PENDIENTES.
    const goal1 = createMockGoal('g1', goal1Puntos);
    const goal2 = createMockGoal('g2', goal2Puntos);
    profile.addGoal(goal1);
    profile.addGoal(goal2);

    expect(profile.totalConfidence).toBe(0);

    // 2. Completa la primera Goal
    profile.completeGoal(goal1.id!);

    // Afirmación A: El Total Confidence debe actualizarse con los puntos de goal1
    expect(profile.totalConfidence).toBe(goal1Puntos);

    // 3. Completa la segunda Goal
    profile.completeGoal(goal2.id!);

    // Afirmación B: El Total Confidence debe ser la suma de goal1 + goal2
    expect(profile.totalConfidence).toBe(goal1Puntos + goal2Puntos); // 80
  });

  // --- Caso 3: No sumar puntos dos veces ---
  it('no debería sumar puntos si una Goal ya estaba completada', () => {
    const goalPuntos = 75;
    const goal = createMockGoal('g3', goalPuntos);
    profile.addGoal(goal);

    // 1. Completa la primera vez
    profile.completeGoal(goal.id!);
    expect(profile.totalConfidence).toBe(goalPuntos);

    // 2. Intenta completar de nuevo
    profile.completeGoal(goal.id!);

    // Afirmación: El total confidence no debe cambiar
    expect(profile.totalConfidence).toBe(goalPuntos);
  });

  // --- Caso 4: Manejo de Goal no encontrada ---
  it('debería lanzar un error si intenta completar una Goal inexistente', () => {
    expect(() => {
      profile.completeGoal('non-existent-id');
    }).toThrow('Goal with ID non-existent-id not found in profile.');
  });


});

describe('Profile Entity - Cancelar Goal', () => {
  let profile: Profile;

  beforeEach(() => {
    // Inicializa el perfil antes de cada prueba
    profile = Profile.create("Guest");
  });

  it('debería aplicar una penalización del 50% sobre coste_subjetivo y reducir totalConfidence cuando la Goal está PENDIENTE', () => {

    const completedGoal = createMockGoal('c1', 100, true);
    const pendingGoal = createMockGoal('p1', 100, false);
    pendingGoal.coste_subjetivo = 100;
    pendingGoal.estado = GoalState.PENDING();

    profile.addGoal(completedGoal);
    profile.addGoal(pendingGoal);

    profile.completeGoal(completedGoal.id!);
    expect(profile.totalConfidence).toBe(100);

    const returned = profile.cancelGoal(pendingGoal.id!);
    expect(returned.id).toBe(pendingGoal.id);
    expect(profile.totalConfidence).toBe(100 - (100 * 0.5));
    expect(profile.goals.find((g) => g.id === pendingGoal.id)).toBeUndefined();
  });

  it('debería remover la Goal cancelada de la lista y devolver la misma instancia', () => {
    const goal = createMockGoal('r1', 40);
    goal.coste_subjetivo = 40;
    goal.estado = GoalState.PENDING();

    profile.addGoal(goal);
    const before = profile.goals.length;

    const returned = profile.cancelGoal(goal.id!);
    expect(returned.id).toBe(goal.id);
    expect(profile.goals.length).toBe(before - 1);
    expect(profile.goals.some((g) => g.id === goal.id)).toBe(false);
  });

  it('no debería aplicar penalización al cancelar una Goal que ya fue COMPLETADA (solo la remueve)', () => {
    const goal = createMockGoal('c2', 80, true);
    goal.coste_subjetivo = 80;

    profile.addGoal(goal);
    profile.completeGoal(goal.id!);
    expect(profile.totalConfidence).toBe(80);

    profile.cancelGoal(goal.id!);
    expect(profile.totalConfidence).toBe(80);
    expect(profile.goals.find((g) => g.id === goal.id)).toBeUndefined();
  });

  it('debería lanzar un error si intenta cancelar una Goal inexistente', () => {
    expect(() => {
      profile.cancelGoal('non-existent-id');
    }).toThrow('Goal with ID non-existent-id not found in profile.');
  });

  it('penalización puede llevar totalConfidence a valores negativos si no hay suficiente confianza previa', () => {
    const goal = createMockGoal('neg1', 100);
    goal.coste_subjetivo = 100;
    goal.estado = GoalState.PENDING();

    profile.addGoal(goal);
    expect(profile.totalConfidence).toBe(0);

    profile.cancelGoal(goal.id!);
    expect(profile.totalConfidence).toBe(0 - (100 * 0.5));
  });
})
describe('Profile Entity - Actualizar Coste Subjetivo de Goal', () => {
  let profile: Profile;

  beforeEach(() => {
    // Inicializa el perfil antes de cada prueba
    profile = Profile.create("Guest");
  });

  it('debería actualizar coste_subjetivo sin penalización cuando el nuevo coste es mayor (subestimación)', () => {
    const completedGoal = createMockGoal('c-update-1', 100, true);
    const targetGoal = createMockGoal('u1', 50, false);
    targetGoal.coste_subjetivo = 50;
    targetGoal.estado = GoalState.PENDING();

    profile.addGoal(completedGoal);
    profile.addGoal(targetGoal);

    profile.completeGoal(completedGoal.id!);
    expect(profile.totalConfidence).toBe(100);

    profile.updateGoalSubjectiveCost(targetGoal.id!, 80);
    expect(profile.goals.find((g) => g.id === targetGoal.id)!.coste_subjetivo).toBe(80);
    expect(profile.totalConfidence).toBe(100);
  });

  it('debería aplicar penalización cuando se reduce el coste subjetivo (sobreestimación)', () => {
    const completedGoal = createMockGoal('c-update-2', 50, true);
    const targetGoal = createMockGoal('u2', 100, false);
    targetGoal.coste_subjetivo = 100;
    targetGoal.estado = GoalState.PENDING();

    profile.addGoal(completedGoal);
    profile.addGoal(targetGoal);

    profile.completeGoal(completedGoal.id!);
    expect(profile.totalConfidence).toBe(50);

    profile.updateGoalSubjectiveCost(targetGoal.id!, 70); // penalty = 30
    expect(profile.goals.find((g) => g.id === targetGoal.id)!.coste_subjetivo).toBe(70);
    expect(profile.totalConfidence).toBe(20);
  });

  it('debería lanzar un error si la Goal no existe', () => {
    expect(() => {
      profile.updateGoalSubjectiveCost('non-existent-id', 10);
    }).toThrow('Goal with ID non-existent-id not found in profile.');
  });

  it('debería lanzar un error si la Goal no está en estado PENDIENTE', () => {
    const goal = createMockGoal('u3', 60);
    profile.addGoal(goal);
    profile.completeGoal(goal.id!); // sets estado a COMPLETADO

    expect(() => {
      profile.updateGoalSubjectiveCost(goal.id!, 40);
    }).toThrow(`Cannot update subjective cost for goal ${goal.id} as it is not in PENDIENTE state.`);
  });

  it('penalización puede llevar totalConfidence a valores negativos si no hay suficiente confianza previa', () => {
    const goal = createMockGoal('u4', 100);
    goal.coste_subjetivo = 100;
    goal.estado = GoalState.PENDING();

    profile.addGoal(goal);
    expect(profile.totalConfidence).toBe(0);

    profile.updateGoalSubjectiveCost(goal.id!, 20); // penalty = 80
    expect(profile.goals.find((g) => g.id === goal.id)!.coste_subjetivo).toBe(20);
    expect(profile.totalConfidence).toBe(0 - 80);
  });
});