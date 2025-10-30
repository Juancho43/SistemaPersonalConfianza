// src/goal/MikroGoalRepository.ts
import { EntityManager } from '@mikro-orm/core';
import { GoalEntity } from '../Mikro/entities/GoalEntity';
import { IGoalRepository } from '../../core/Domain/IGoalRepository';
import { Goal } from '../../core/Domain/Goal';
import { GoalMapper } from './controllers/services/GoalMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MikroGoalRepository implements IGoalRepository {
  constructor(
    private readonly em: EntityManager, // Inyecta el EntityManager
  ) {}
  async getById(id: string): Promise<Goal | null> {
    const entity = await this.em.findOne(GoalEntity, { id });
    return entity ? GoalMapper.toDomain(entity) : null;
  }

  async save(goal: Goal): Promise<void> {
    await this.em.transactional(async (em) => {
      // Map domain -> plain entity instance
      const entity = GoalMapper.toEntity(goal);

      // If domain has a parent, use a managed reference so MikroORM won't try to insert it
      if (goal.padre && goal.padre.id) {
        // assign to the entity property name used in your entity: meta_padre
        entity.meta_padre = em.getReference(GoalEntity, goal.padre.id);
      }

      // Upsert: find existing managed entity by PK and copy fields, otherwise persist new
      const existing = await em.findOne(GoalEntity, entity.id);
      if (existing) {
        Object.assign(existing, entity);
        await em.flush();
        return;
      }

      await em.persistAndFlush(entity);
    });
  }}
