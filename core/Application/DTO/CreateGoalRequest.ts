export class CreateGoalRequest  {
  constructor(
    public name: string,
    public cost: number,
    public description?: string,
    public state: 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA' = 'PENDIENTE',
    public parentGoalId?: string,
  ) {}
}