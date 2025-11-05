import { CreateGoalRequest } from './CreateGoalRequest';

export class UpdateGoalRequest {
  constructor(
    public id: string,
    public profileId: string,
    public goal: CreateGoalRequest,
  ) {}
}
