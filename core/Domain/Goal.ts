export class Goal {
  private _id?: string;
  private _nombre: string;
  private _descripcion?: string;
  private _coste_subjetivo: number;
  private _estado: 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA' = 'PENDIENTE';
  private _penalizacion_restada: number = 0;
  private _puntos_ganados: number = 0;
  private _padre: Goal | null = null;
  private constructor(
    nombre: string,
    cs: number,
    descripcion?: string,
    id?: string,
  ) {
    if (cs < 1 || cs >= 101) {
      throw new Error('El Coste Subjetivo debe estar entre 1 y 100.');
    }
    this._nombre = nombre;
    this._coste_subjetivo = cs;
    this._descripcion = descripcion;
    this._id = id;
  }
  public static create(
    nombre: string,
    cs: number,
    descripcion?: string,
    id?: string,
  ): Goal {
    return new Goal(nombre, cs, descripcion, id);
  }

  get padre(): Goal | null {
    return this._padre;
  }

  set padre(value: Goal | null) {
    this._padre = value;
  }

  public marcar_abandonada(): void {
    if (this._estado === 'PENDIENTE') {
      this._estado = 'ABANDONADA';
      this._penalizacion_restada = this._coste_subjetivo * 0.5;
    }
  }

  public get id(): string | undefined {
    return this._id;
  }
  public get estado(): 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA' {
    return this._estado;
  }

  public get penalizacion_restada(): number {
    return this._penalizacion_restada;
  }
  set estado(value: 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA') {
    this._estado = value;
  }
  public get puntos_ganados(): number {
    return this._puntos_ganados;
  }
  set puntos_ganados(value: number) {
    this._puntos_ganados = value;
  }
  set penalizacion_restada(value: number) {
    this._penalizacion_restada = value;
  }

  set id(value: string) {
    this._id = value;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  set coste_subjetivo(value: number) {
    this._coste_subjetivo = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  get coste_subjetivo(): number {
    return this._coste_subjetivo;
  }

  get descripcion(): string | undefined {
    return this._descripcion;
  }

  set descripcion(value: string) {
    this._descripcion = value;
  }
}
