import { Progress } from '../../../../core/Progress/Domain/Progress';
import { ProgressiveGoal } from '../../../../core/ProgressiveGoal/Domain/ProgressiveGoal';
import { Goal } from '../../../../core/Goal/Domain/Goal';

const createBaseGoal = (id = 'g-1') => Goal.create(`Goal ${id}`, 10, 'BASICA', `Desc ${id}`, id);
describe('Progress Entity', () => {

test('should create Progress with required fields and optional fields undefined by default', () => {
  const goal = createBaseGoal('goal-1');
  const pg = ProgressiveGoal.create('pg-1', goal, 'km', 5);
  const p = Progress.create('p-1', pg, 2);

  expect(p.id).toBe('p-1');
  expect(p.ProgressiveGoal).toBe(pg);
  expect(p.progress).toBe(2);
  expect(p.date).toBeUndefined();
  expect(p.description).toBeUndefined();
});

test('should create Progress with date and description preserved', () => {
  const goal = createBaseGoal('goal-2');
  const pg = ProgressiveGoal.create('pg-2', goal, 'km', 5);
  const now = new Date();
  const p = Progress.create('p-2', pg, 1.5, now, 'Morning run');

  expect(p.id).toBe('p-2');
  expect(p.ProgressiveGoal).toBe(pg);
  expect(p.progress).toBeCloseTo(1.5);
  expect(p.date).toEqual(now);
  expect(p.description).toBe('Morning run');
});

test('should allow updating id, progress, date and description via setters and reflect via getters', () => {
  const goal = createBaseGoal('goal-3');
  const pg = ProgressiveGoal.create('pg-3', goal, 'libros', 3);
  const p = Progress.create('p-3', pg, 0);

  p.id = 'p-3-updated';
  p.progress = 4.25;
  const newDate = new Date(2020, 0, 1);
  p.date = newDate;
  p.description = 'Updated desc';

  expect(p.id).toBe('p-3-updated');
  expect(p.progress).toBeCloseTo(4.25);
  expect(p.date).toEqual(newDate);
  expect(p.description).toBe('Updated desc');
});

test('should accept zero and decimal progress values', () => {
  const goal = createBaseGoal('goal-4');
  const pg = ProgressiveGoal.create('pg-4', goal, 'horas', 2);
  const pZero = Progress.create('p-4a', pg, 0);
  const pDecimal = Progress.create('p-4b', pg, 2.75);

  expect(pZero.progress).toBe(0);
  expect(pDecimal.progress).toBeCloseTo(2.75);
});

test('adding Progress to ProgressiveGoal stores the Progress and updates ProgressiveGoal currentProgress', () => {
  const goal = createBaseGoal('goal-5');
  const pg = ProgressiveGoal.create('pg-5', goal, 'km', 10);
  const p = Progress.create('p-5', pg, 3);

  pg.addProgress(p);

  expect(pg.progress).toContain(p);
  expect(pg.currentProgress).toBe(3);
});

test('allows negative progress values and affects ProgressiveGoal currentProgress accordingly', () => {
  const goal = createBaseGoal('goal-6');
  const pg = ProgressiveGoal.create('pg-6', goal, 'km', 10);
  const pNeg = Progress.create('p-6', pg, -2);

  pg.addProgress(pNeg);

  expect(pg.progress).toContain(pNeg);
  expect(pg.currentProgress).toBe(-2);
});
})
