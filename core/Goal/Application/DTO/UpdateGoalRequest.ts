import { CreateGoalRequest } from './CreateGoalRequest';

export class UpdateGoalRequest {
  constructor(
    public id: string,
    public goal: CreateGoalRequest,
  ) {}
}
