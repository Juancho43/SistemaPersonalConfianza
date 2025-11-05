import { GoalState } from './GoalState';
import { Profile } from '../../Profile/Domain/Profile';

export class Goal {
  private _id?: string;
  private _nombre: string;
  private _descripcion?: string;
  private _coste_subjetivo: number;
  private _estado: GoalState;
  private _penalizacion_restada: number = 0;
  private _puntos_ganados: number = 0;
  private _padre: Goal | null = null;
  private _submetas: Goal[] = [];
  private _profile: Profile;
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
    if (this._estado.getValue() === 'PENDIENTE') {
      this._estado = GoalState.ABANDONED();
      this._penalizacion_restada = this._coste_subjetivo * 0.5;
    }
  }

  public get id(): string | undefined {
    return this._id;
  }
  public get estado(): string {
    return this._estado.getValue();
  }

  public get penalizacion_restada(): number {
    return this._penalizacion_restada;
  }
  set estado(value: GoalState) {
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
  get Submetas(): Goal[] {
    return this._submetas;
  }
  set Submetas(value: Goal[]) {
    this._submetas = value;
  }
  nuevaSubMeta(submeta: Goal): void {
    this.Submetas.push(submeta);
  }

  get submetas(): Goal[] {
    return this._submetas;
  }

  get profile(): Profile {
    return this._profile;
  }

  set submetas(value: Goal[]) {
    this._submetas = value;
  }

  set profile(value: Profile) {
    this._profile = value;
  }

  public markAsComplete(): number {
    // 1. Validación de Precondición (CA 2.2)
    if (this._submetas.length > 0) {
      const submetasPendientes = this._submetas.filter(
        (sub) => sub.estado !== 'COMPLETADA',
      );

      if (submetasPendientes.length > 0) {
        // Lanza un error de dominio que será capturado por el Use Case
        throw new Error(
          'No se puede completar la Meta Principal. Todas las submetas deben estar completadas.',
        );
      }
    }

    // 2. Cambio de Estado
    // (Asumo que el setter ya usa el VO GoalState y hace la validación de estado válido)
    this.estado = GoalState.COMPLETED();

    // 3. Cálculo de Puntos Ganados (CA 2.1 / CA 2.3)
    // La puntuación ganada es igual al Coste Subjetivo (CS)
    this.puntos_ganados = this.coste_subjetivo;
    return this.puntos_ganados;
  }
  get puntosGanados(): number {
    return this._puntos_ganados;
  }
}
