import { GetGoalsByStateInterface } from '../Domain/Persistance/GetGoalsByStateInterface';
import { IUseCase } from '../../Shared/IUseCase';
import { FilteredGoalsQuery } from './DTO/FilteredGoalsQuery';
import { Goaleable } from '../../Goal/Goaleable';

export class GetFilteredGoals
  implements IUseCase<FilteredGoalsQuery, Goaleable[]>
{
  constructor(private readonly getGoals: GetGoalsByStateInterface) {}

  async execute(query: FilteredGoalsQuery): Promise<Goaleable[]> {
    return await this.getGoals.getGoalsByState(
      query.profileId,
      query.state,
      query.order,
    );
  }
}
