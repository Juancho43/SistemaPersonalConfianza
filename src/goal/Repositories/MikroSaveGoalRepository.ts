import { CreateGoalInterface } from '../../../core/Goal/Domain/Persistance/CreateGoalInterface';
import { Goal } from '../../../core/Goal/Domain/Goal';
import { EntityManager } from '@mikro-orm/core';
import { GoalMapper } from './GoalMapper';
import { GoalEntity } from '../../Mikro/entities/GoalEntity';
import { Injectable } from '@nestjs/common';
import { ProfileEntity } from '../../Mikro/entities/ProfileEntity';

@Injectable()
export class MikroSaveGoalRepository implements CreateGoalInterface {
  constructor(private readonly em: EntityManager) {}

  async save(goal: Goal): Promise<void> {
    console.log('=== DEBUG SAVE GOAL ===');
    console.log('1. Goal completo:', goal);
    console.log('2. goal.profile:', goal.profile);
    console.log('3. goal.profile?.id:', goal.profile?.id);
    console.log('4. goal.padre:', goal.padre);
    console.log('5. goal.padre?.id:', goal.padre?.id);
    console.log('6. goal.id:', goal.id);

    try {
      await this.em.transactional(async (em) => {
        console.log('7. Dentro de transactional');

        // Buscar si existe
        console.log('8. Buscando goal con id:', goal.id);
        let entity = await em.findOne(GoalEntity, goal.id!);
        console.log('9. Entity encontrada:', entity);

        if (entity) {
          console.log('10. Actualizando existente');
          entity.nombre = goal.nombre;
          entity.descripcion = goal.descripcion;
          entity.coste_subjetivo = goal.coste_subjetivo;
          entity.estado = goal.estado;
          entity.puntos_ganados = goal.puntos_ganados;
          entity.penalizacion_restada = goal.penalizacion_restada;

          console.log('11. Asignando profile reference');
          if (goal.profile?.id) {
            entity.profile = em.getReference(ProfileEntity, goal.profile.id);
            console.log('12. Profile asignado');
          }

          if (goal.padre?.id) {
            entity.meta_padre = em.getReference(GoalEntity, goal.padre.id);
          }
        } else {
          console.log('13. Creando nuevo');
          entity = GoalMapper.toEntity(goal);
          console.log('14. Entity mapeada:', entity);

          if (goal.profile?.id) {
            console.log('15. Asignando profile al nuevo');
            entity.profile = em.getReference(ProfileEntity, goal.profile.id);
          }

          if (goal.padre?.id) {
            entity.meta_padre = em.getReference(GoalEntity, goal.padre.id);
          }

          console.log('16. Antes de persist');
          em.persist(entity);
          console.log('17. Después de persist');
        }

        console.log('18. Antes de flush');
        await em.flush();
        console.log('19. Después de flush - SUCCESS');
      });
    } catch (error) {
      console.error('ERROR EN SAVE:', error);
      console.error('Stack:', error.stack);
      throw error;
    }
  }
}
