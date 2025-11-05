export class CreateGoalRequest  {
  name: string;
  cost: number;
  description?: string;
  state: 'PENDIENTE' | 'COMPLETADA' | 'ABANDONADA'
  profileId?: string;
  parentGoalId?: string;

}