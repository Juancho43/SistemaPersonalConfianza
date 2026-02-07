// tests/Core/Goal/Domain/progressive-goal.spec.ts
import { ProgressiveGoal } from '../../../../core/ProgressiveGoal/Domain/ProgressiveGoal';
import { Goal } from '../../../../core/Goal/Domain/Goal';
const createBaseGoal = (id = 'g-1') =>
  // Goal.create(name: string, cost: number, type: string, description: string | undefined, id: string)
  Goal.create(`Goal ${id}`, 20, 'BASICA', `Desc ${id}`, id);
describe('ProgressiveGoal Entity', () => {


  test('should create a ProgressiveGoal with initial values', () => {
    const goal = createBaseGoal('base-1');
    const pg = ProgressiveGoal.create('pg-1', goal, 'libros', 10);

    expect(pg.id).toBe('pg-1');
    expect(pg.goal).toBe(goal);
    expect(pg.measureUnit).toBe('libros');
    expect(pg.amount).toBe(10); // Expect numeric amount
    expect(pg.currentProgress).toBe(0);
    expect(Array.isArray(pg.progress)).toBe(true);
    expect(pg.progress.length).toBe(0);
  });

  test('should accumulate progress when addProgress is called', () => {
    const goal = createBaseGoal('acc-1');
    const pg = ProgressiveGoal.create('pg-acc', goal, 'km', 5);

    // use minimal progress-like objects compatible with the domain
    const p1 = { id: 'p1', progress: 2 } as any;
    const p2 = { id: 'p2', progress: 1 } as any;

    pg.addProgress(p1);
    expect(pg.currentProgress).toBe(2);
    expect(pg.progress.length).toBe(1);
    expect(pg.progress[0].progress).toBe(2);

    pg.addProgress(p2);
    expect(pg.currentProgress).toBe(3);
    expect(pg.progress.length).toBe(2);
    expect(pg.progress.map((p) => p.progress)).toEqual([2, 1]);
  });

  test('should allow different measure units (libros, km, horas)', () => {
    const goal1 = createBaseGoal('u1');
    const goal2 = createBaseGoal('u2');
    const goal3 = createBaseGoal('u3');

    const pgLibros = ProgressiveGoal.create('pg-l', goal1, 'libros', 3);
    const pgKm = ProgressiveGoal.create('pg-k', goal2, 'km', 7);
    const pgHoras = ProgressiveGoal.create('pg-h', goal3, 'horas', 12);

    expect(pgLibros.measureUnit).toBe('libros');
    expect(pgKm.measureUnit).toBe('km');
    expect(pgHoras.measureUnit).toBe('horas');

    expect(pgLibros.amount).toBe(3);
    expect(pgKm.amount).toBe(7);
    expect(pgHoras.amount).toBe(12);
  });

  test('getters and setters should work for mutable properties', () => {
    const goal = createBaseGoal('mut-1');
    const pg = ProgressiveGoal.create('pg-mut', goal, 'libros', 4);

    // setters
    pg.measureUnit = 'km';
    pg.amount = 8;
    pg.currentProgress = 2;
    pg.progress = [{ id: 'x', progress: 2 } as any];

    // getters
    expect(pg.measureUnit).toBe('km');
    expect(pg.amount).toBe(8);
    expect(pg.currentProgress).toBe(2);
    expect(pg.progress.length).toBe(1);
    expect(pg.progress[0].progress).toBe(2);
  });
});

describe('Complete a ProgressiveGoal', () => {
  test('completes when accumulated progress equals the required amount', () => {
    const goal = createBaseGoal('complete-eq');
    const pg = ProgressiveGoal.create('pg-eq', goal, 'km', 5);

    const p1 = { id: 'p1', progress: 2 } as any;
    const p2 = { id: 'p2', progress: 3 } as any;

    pg.addProgress(p1);
    pg.addProgress(p2);

    expect(pg.currentProgress).toBe(5);
    expect(pg.currentProgress).toBeGreaterThanOrEqual(pg.amount);
    expect(pg.progress.length).toBe(2);
  });

  test('completes when accumulated progress exceeds the required amount (overachievement)', () => {
    const goal = createBaseGoal('complete-over');
    const pg = ProgressiveGoal.create('pg-over', goal, 'libros', 5);

    const p = { id: 'p-over', progress: 6 } as any;

    pg.addProgress(p);

    expect(pg.currentProgress).toBe(6);
    expect(pg.currentProgress).toBeGreaterThan(pg.amount);
    expect(pg.progress).toContain(p);
  });
})