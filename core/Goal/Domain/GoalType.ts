export type GoalTypeValue = 'BASICA' | 'FRECUENCIA' | 'ACUMULATIVA';

export class GoalType {
  private readonly value: GoalTypeValue;

  private constructor(value: GoalTypeValue) {
    this.value = value;
  }

  public static fromValue(type: string): GoalType {
    if (!GoalType.isValid(type)) {
      throw new Error(`Invalid GoalType: ${type}. Allowed: BASICA, FRECUENCIA, ACUMULATIVA.`);
    }
    return new GoalType(type as GoalTypeValue);
  }

  public static BASICA(): GoalType {
    return new GoalType('BASICA');
  }

  public static FRECUENCIA(): GoalType {
    return new GoalType('FRECUENCIA');
  }

  public static ACUMULATIVA(): GoalType {
    return new GoalType('ACUMULATIVA');
  }

  private static isValid(type: string): boolean {
    return ['BASICA', 'FRECUENCIA', 'ACUMULATIVA'].includes(type);
  }

  public static getAllValid(): string[] {
    return ['BASICA', 'FRECUENCIA', 'ACUMULATIVA'];
  }

  public getValue(): GoalTypeValue {
    return this.value;
  }

  public equals(other: GoalType): boolean {
    if (!(other instanceof GoalType)) {
      return false;
    }
    return this.value === other.value;
  }
}