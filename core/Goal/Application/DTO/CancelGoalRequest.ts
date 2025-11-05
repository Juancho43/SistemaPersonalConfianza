export class CancelGoalRequest{
  constructor(
    public readonly profileId: string,
    public readonly goalId: string,
  ){}
}