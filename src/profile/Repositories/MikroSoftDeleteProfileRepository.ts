import { Profile } from '../../../core/Profile/Domain/Profile';
import { Injectable } from '@nestjs/common';
import { ProfileEntity } from '../../Mikro/entities/ProfileEntity';
import { EntityManager } from '@mikro-orm/core';
import { ProfileMapper } from './ProfileMapper';
import { DeleteProfileInterface } from '../../../core/Profile/Domain/Persistance/SoftDeleteProfileInterface';

@Injectable()
export class MikroSoftDeleteProfileRepository
  implements DeleteProfileInterface
{
  constructor(private readonly em: EntityManager) {}
  async softDelete(id: string): Promise<Profile | null> {
    const entity = await this.em.findOne(ProfileEntity, { id });

    if (!entity) {
      return null;
    }
    entity.deletedAt = new Date();
    await this.em.flush();

    return ProfileMapper.toDomain(entity);
  }
}
