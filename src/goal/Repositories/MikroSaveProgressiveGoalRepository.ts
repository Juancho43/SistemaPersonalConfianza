// src/goal/Repositories/MikroSaveProgressiveGoalRepository.ts
import { ProgressiveGoal } from 'core/ProgressiveGoal/Domain/ProgressiveGoal';
import { CreateProgressiveGoalInterface } from '../../../core/ProgressiveGoal/Domain/Persistance/CreateProgressiveGoalInterface';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { ProgressiveGoalMapper } from './ProgressiveGoalMapper';
import { ProgressiveGoalEntity } from '../../Mikro/entities/ProgressiveGoalEntity';
import { ProfileEntity } from '../../Mikro/entities/ProfileEntity';
import { GoalEntity } from '../../Mikro/entities/GoalEntity';

@Injectable()
export class MikroSaveProgressiveGoalRepository
  implements CreateProgressiveGoalInterface
{
  constructor(private readonly em: EntityManager) {}

  async save(progressiveGoal: ProgressiveGoal): Promise<void> {
    console.log('=== DEBUG SAVE PROGRESSIVE GOAL ===');
    console.log('1. ProgressiveGoal:', progressiveGoal);
    try {
      await this.em.transactional(async (em) => {
        console.log('2. Inside transactional');
        console.log('3. Searching entity with id:', progressiveGoal.id);
        let entity = await em.findOne(
          ProgressiveGoalEntity,
          progressiveGoal.getId()!,
        );
        console.log('4. Found entity:', entity);

        if (entity) {
          console.log('5. Updating existing progressive goal');
          const mapped = ProgressiveGoalMapper.toEntity(progressiveGoal);
          Object.assign(entity, mapped);

          if (progressiveGoal.goal.profile?.id) {
            entity.goal.profile = em.getReference(
              ProfileEntity,
              progressiveGoal.goal.profile.id,
            );
            console.log('6. Profile reference assigned');
          }

          // if there's a parent/goal relation similar to Goal repository
          if (progressiveGoal.getGoal().padre?.getId()) {
            entity.goal.meta_padre = em.getReference(
              GoalEntity,
              progressiveGoal.getGoal().padre!.getId()!,
            );
            console.log('7. Parent goal reference assigned');
          }
        } else {
          console.log('8. Creating new progressive goal entity');
          const goalEntity = em.getReference(
            GoalEntity,
            progressiveGoal.getGoal().getId()!,
          );
          entity = ProgressiveGoalMapper.toEntity(progressiveGoal);
          entity.goal = goalEntity;
// Ensure nested goal.profile is set before persist (required by MikroORM)
          if (progressiveGoal.getGoal()?.profile?.id) {
            entity.goal.profile = em.getReference(
              ProfileEntity,
              progressiveGoal.goal.profile.id,
            );
            console.log('9. Profile reference assigned to new entity');
          }
          em.persist(entity);
          console.log('10. Persisted new progressive goal entity');
        }

        console.log('11. Flushing');
        await em.flush();
        console.log('12. Flush complete - SUCCESS');
      });
    } catch (error) {
      console.error('ERROR IN SAVE PROGRESSIVE GOAL:', error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Stack:', error.stack);
      throw error;
    }
  }
}
