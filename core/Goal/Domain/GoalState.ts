// Define los posibles valores del estado
export type GoalStateValue = 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA';

/**
 * GoalState es un Value Object que encapsula el estado de una Goal.
 * Asegura que el estado siempre sea un valor válido.
 */
export class GoalState {
  private readonly value: GoalStateValue;

  private constructor(value: GoalStateValue) {
    this.value = value;
  }

  /**
   * Crea una instancia de GoalState a partir de una cadena de texto.
   * Lanza un error si el valor no es válido.
   */
  public static fromValue(state: string): GoalState {
    if (!GoalState.isValid(state)) {
      throw new Error(`Estado de Goal inválido: ${state}. Debe ser PENDIENTE, COMPLETADA o ABANDONADA.`);
    }
    // La aserción 'as GoalStateValue' es segura gracias a la verificación isValid
    return new GoalState(state as GoalStateValue);
  }

  /**
   * Métodos estáticos para crear instancias predefinidas (Factory methods)
   */
  public static PENDING(): GoalState {
    return new GoalState('PENDIENTE');
  }

  public static COMPLETED(): GoalState {
    return new GoalState('COMPLETADA');
  }

  public static ABANDONED(): GoalState {
    return new GoalState('ABANDONADA');
  }

  /**
   * Verifica si una cadena de texto es un estado de Goal válido.
   */
  private static isValid(state: string): boolean {
    return ['PENDIENTE', 'COMPLETADA', 'ABANDONADA'].includes(state);
  }

  /**
   * Devuelve el valor primitivo del estado (el string).
   */
  public getValue(): GoalStateValue {
    return this.value;
  }

  /**
   * Método de igualdad (Value Object Equality)
   */
  public equals(other: GoalState): boolean {
    if (!(other instanceof GoalState)) {
      return false;
    }
    return this.value === other.value;
  }
}