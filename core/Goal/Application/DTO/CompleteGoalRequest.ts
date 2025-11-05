export class CompleteGoalRequest{
  constructor(
    public readonly profileId: string,
    public readonly goalId: string,
  ){}
}