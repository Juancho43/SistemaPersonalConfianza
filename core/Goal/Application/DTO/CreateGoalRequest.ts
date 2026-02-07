export class CreateGoalRequest {
  constructor(
    public profileId: string,
    public name: string,
    public cost: number,
    public description?: string,
    public state: 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA' = 'PENDIENTE',
    public parentGoalId?: string,
    public type: 'BASICA' | 'PROGRESIVA' | 'ACUMULATIVA' = 'BASICA',
    public deadline?: string,
  ) {}
}
