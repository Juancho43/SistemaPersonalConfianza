import { GoalType } from '../../../../core/Goal/Domain/GoalType';

describe('GoalType Value Object', () => {
  it('should create BASICA from a valid string', () => {
    const type = GoalType.fromValue('BASICA');
    expect(type).toBeInstanceOf(GoalType);
    expect(type.getValue()).toBe('BASICA');
  });

  it('should throw an error when creating from an invalid string', () => {
    const invalid = 'UNKNOWN_TYPE';
    expect(() => {
      GoalType.fromValue(invalid);
    }).toThrow(`Invalid GoalType: ${invalid}. Allowed: BASICA, FRECUENCIA, ACUMULATIVA.`);
  });

  it('should create types using the factory static methods', () => {
    expect(GoalType.BASICA().getValue()).toBe('BASICA');
    expect(GoalType.FRECUENCIA().getValue()).toBe('FRECUENCIA');
    expect(GoalType.ACUMULATIVA().getValue()).toBe('ACUMULATIVA');
  });

  it('should be equal to another GoalType with the same value', () => {
    const t1 = GoalType.fromValue('FRECUENCIA');
    const t2 = GoalType.FRECUENCIA();
    expect(t1.equals(t2)).toBe(true);
  });

  it('should not be equal to a GoalType with a different value', () => {
    const t1 = GoalType.BASICA();
    const t2 = GoalType.ACUMULATIVA();
    expect(t1.equals(t2)).toBe(false);
  });

  it('should return all valid goal type values', () => {
    expect(GoalType.getAllValid()).toEqual(['BASICA', 'FRECUENCIA', 'ACUMULATIVA']);
  });
});