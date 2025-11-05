import { GetGoalByIdInterface } from '../../../core/Goal/Domain/Persistance/GetGoalByIdInterface';
import { Goal } from '../../../core/Goal/Domain/Goal';
import { EntityManager } from '@mikro-orm/core';
import { GoalEntity } from '../../Mikro/entities/GoalEntity';
import { GoalMapper } from './GoalMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MikroGetGoalRepository implements GetGoalByIdInterface {
  constructor(
    private readonly em: EntityManager, // Inyecta el EntityManager
  ) {}
  async getById(id: string): Promise<Goal | null> {
    const entity = await this.em.findOne(
      GoalEntity,
      { id },
      { populate: ['submetas', 'submetas.submetas'] },
    );
    return entity ? GoalMapper.toDomain(entity) : null;
  }
}
