export class Goal {
  private _id?: number;
  private _nombre: string;
  private _coste_subjetivo: number;
  private _estado: 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA' = 'PENDIENTE';
  private _penalizacion_restada: number = 0;
  private _puntos_ganados: number = 0;

  private constructor(nombre: string, cs: number, id?: number) {
    if (cs < 1 || cs > 100) {
      throw new Error('El Coste Subjetivo debe estar entre 1 y 100.');
    }
    this._nombre = nombre;
    this._coste_subjetivo = cs;
    this._id = id;
  }

  public static create(nombre: string, cs: number, id?: number): Goal {
    return new Goal(nombre, cs, id);
  }

  public marcar_abandonada(): void {
    if (this._estado === 'PENDIENTE') {
      this._estado = 'ABANDONADA';
      this._penalizacion_restada = this._coste_subjetivo * 0.5;
    }
  }

  public get id(): number | undefined {
    return this._id;
  }
  public get estado(): string {
    return this._estado;
  }

  public get penalizacion_restada(): number {
    return this._penalizacion_restada;
  }
  set estado(value: 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA') {
    this._estado = value;
  }
}
