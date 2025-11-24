import { GetProfileInterface } from '../../../core/Profile/Domain/Persistance/GetProfileInterface';
import { Profile } from '../../../core/Profile/Domain/Profile';
import { Injectable } from '@nestjs/common';
import { ProfileEntity } from '../../Mikro/entities/ProfileEntity';
import { EntityManager } from '@mikro-orm/core';
import { ProfileMapper } from './ProfileMapper';

@Injectable()
export class MikroGetProfileRepository implements GetProfileInterface {
  constructor(private readonly em: EntityManager) {}

  async getById(id: string): Promise<Profile | null> {
    const entity = await this.em.findOne(
      ProfileEntity,
      { id },
      { populate: ['goals.submetas.submetas'] },
    );

    if (!entity) {
      return null;
    }

    return ProfileMapper.toDomain(entity);
  }
}
