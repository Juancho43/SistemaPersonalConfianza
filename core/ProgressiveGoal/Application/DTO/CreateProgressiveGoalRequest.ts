import { CreateGoalRequest } from '../../../Goal/Application/DTO/CreateGoalRequest';
import { Progress } from '../../../Progress/Domain/Progress';

export class CreateProgressiveGoalRequest{
  goal: CreateGoalRequest;
  measureUnit: string;
  amount: number;
}