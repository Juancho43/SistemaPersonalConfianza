import { Goaleable } from '../../../Goal/Goaleable';

export interface GetGoalsByStateInterface {
  getGoalsByState(
    profileId: string,
    state: string,
    order: string,
  ): Promise<Goaleable[]>;
}
