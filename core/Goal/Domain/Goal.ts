import { GoalState } from './GoalState';
import { Profile } from '../../Profile/Domain/Profile';
import { GoalType } from './GoalType';
import { Goaleable } from '../Goaleable';

export class Goal implements Goaleable {
  private _id?: string;
  private _nombre: string;
  private _descripcion?: string;
  private _coste_subjetivo: number;
  private _estado: GoalState;
  private _deadline?: Date;
  private _penalizacion_restada: number = 0;
  private _puntos_ganados: number = 0;
  private _padre: Goaleable | null = null;
  private _submetas: Goaleable[] = [];
  private _profile: Profile;
  private _type: GoalType;
  private constructor(
    nombre: string,
    cs: number,
    type: string,
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
    this._type = GoalType.fromValue(type);
    this._estado = GoalState.PENDING();
  }
  getId(): string | undefined {
    return this._id;
  }
  getTotalPoints(): number {
    return this._puntos_ganados;
  }
  getGoal(): Goal {
    return this;
  }
  getState(): GoalState {
    return this._estado;
  }
  getType(): GoalType {
    return this._type;
  }

  public static create(
    nombre: string,
    cs: number,
    type: string = 'BASICA',
    descripcion?: string,
    id?: string,
  ): Goal {
    return new Goal(nombre, cs, type, descripcion, id);
  }

  get padre(): Goaleable | null {
    return this._padre;
  }

  set tipo(value: GoalType) {
    this._type = value;
  }
  set padre(value: Goaleable | null) {
    this._padre = value;
  }
  public marcar_abandonada(): void {
    if (this._estado.getValue() === 'PENDIENTE') {
      this._estado = GoalState.ABANDONED();
      this._penalizacion_restada = this._coste_subjetivo * 0.5;

      // Cancelar también las submetas (propaga recursivamente)
      for (const sub of this._submetas) {
        sub.getGoal().marcar_abandonada();
      }
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
  get Submetas(): Goaleable[] {
    return this._submetas;
  }
  set Submetas(value: Goaleable[]) {
    this._submetas = value;
  }
  nuevaSubMeta(submeta: Goaleable): void {
    this.Submetas.push(submeta);
  }

  get submetas(): Goaleable[] {
    return this._submetas;
  }

  get profile(): Profile {
    return this._profile;
  }

  set submetas(value: Goaleable[]) {
    this._submetas = value;
  }

  set profile(value: Profile) {
    this._profile = value;
  }

  get deadline(): Date | undefined {
    return this._deadline;
  }

  set deadline(value: Date | undefined) {
    this._deadline = value;
  }

  public markAsComplete(): number {
    if (this.getState().equals(GoalState.COMPLETED())) {
      return 0; // already completed — do nothing
    }
    // 1. Validación de Precondición (CA 2.2)
    if (this._submetas.length > 0) {
      const submetasPendientes = this._submetas.filter(
        (sub) => sub.getGoal().estado !== 'COMPLETADA',
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

  get type(): GoalType {
    return this._type;
  }
}
