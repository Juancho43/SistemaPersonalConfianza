import { CreateProfileInterface } from '../../../core/Profile/Domain/Persistance/CreateProfileInterface';
import { Profile } from '../../../core/Profile/Domain/Profile';
import { EntityManager } from '@mikro-orm/core';
import { ProfileMapper } from './ProfileMapper';
import { ProfileEntity } from '../../Mikro/entities/ProfileEntity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MikroCreateProfileRepository implements CreateProfileInterface {
  constructor(private readonly em: EntityManager) {}

  async save(profile: Profile): Promise<void> {
    const entity = ProfileMapper.toEntity(profile);

    const existing = await this.em.findOne(ProfileEntity, entity.id);

    if (existing) {
      this.em.assign(existing, entity); // Usa assign en lugar de Object.assign
    } else {
      this.em.persist(entity);
    }

    await this.em.flush();
  }
}
