import { Profile } from '../../../core/Profile/Domain/Profile';
import { Injectable } from '@nestjs/common';
import { ProfileEntity } from '../../Mikro/entities/ProfileEntity';
import { EntityManager } from '@mikro-orm/core';
import { ProfileMapper } from './ProfileMapper';
import { GetAllProfilesInterface } from '../../../core/Profile/Domain/Persistance/GetAllProfilesInterface';

@Injectable()
export class MikroGetAllProfilesRepository implements GetAllProfilesInterface {
  constructor(private readonly em: EntityManager) {}

  async getAll(): Promise<Profile[] | null> {
    const entities = await this.em.find(ProfileEntity, {});

    if (!entities || entities.length === 0) {
      return null;
    }

    return entities.map((e) => ProfileMapper.toDomain(e));
  }
}
