import { GetGoalsByStateInterface } from '../../../core/Profile/Domain/Persistance/GetGoalsByStateInterface';
import { EntityManager, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { GoalEntity } from '../../Mikro/entities/GoalEntity';
import { Injectable } from '@nestjs/common';
import { GoaleableMapper } from '../../Mikro/GoleableMapper';
import { Goaleable } from '../../../core/Goal/Goaleable';

@Injectable()
export class MikroGetFilteredGoalsRepository
  implements GetGoalsByStateInterface
{
  constructor(private readonly em: EntityManager) {}

  async getGoalsByState(
    profileId: string,
    state: string,
    order: string,
  ): Promise<Goaleable[]> {
    const where: FilterQuery<GoalEntity> = {
      profile: profileId,
      meta_padre: null,
    };
    if (state !== 'none') {
      where.estado = state;
    }
    const entities = await this.em.find(GoalEntity, where, {
      populate: ['submetas.submetas'],
      orderBy: {
        createdAt: order === 'Descentente' ? QueryOrder.DESC : QueryOrder.ASC,
      },
    });

    return entities.map((entity) => GoaleableMapper.toDomain(entity));
  }
}
