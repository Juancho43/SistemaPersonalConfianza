import { Goal } from '../../../core/Goal/Domain/Goal';
import { GoalEntity } from '../../Mikro/entities/GoalEntity';
import { GoalState } from '../../../core/Goal/Domain/GoalState';
import { GoalType } from '../../../core/Goal/Domain/GoalType';

export class GoalMapper {
  /**
   * Convierte una Entidad de Persistencia (GoalEntity) a un Objeto de Dominio (Goal).
   * @param entity La instancia de GoalEntity recuperada de la base de datos.
   * @returns Una nueva instancia de la clase Goal.
   */
  public static toDomain(entity: GoalEntity): Goal {
    // Nota: El ID de la DB (number) se pasa como ID del dominio.
    const goal = Goal.create(
      entity.nombre,
      entity.coste_subjetivo,
      entity.tipo,
      entity.descripcion,
      entity.id, // Mapea el ID de la DB
    );

    goal.estado = GoalState.fromValue(entity.estado);
    goal.penalizacion_restada = entity.penalizacion_restada;
    goal.puntos_ganados = entity.puntos_ganados;
    goal.tipo = GoalType.fromValue(entity.tipo);
    goal.deadline = entity.deadLine ?? undefined;
    // Las propiedades de descripción y jerarquía se pueden manejar de forma optativa
    // si son necesarias en el objeto de dominio  if (entity.submetas && entity.submetas.isInitialized()) {
    //     goal.submetas = entity.submetas.getItems().map(submeta =>
    //       this.toDomain(submeta)
    //     );
    //   }.
    if (entity.submetas && entity.submetas.isInitialized()) {
      goal.submetas = entity.submetas
        .getItems()
        .map((submeta) => this.toDomain(submeta));
    }

    return goal;
  }

  // ---

  /**
   * Convierte un Objeto de Dominio (Goal) a una Entidad de Persistencia (GoalEntity).
   * * Nota importante: El mapeo a Entity depende de si la entidad ya existe o si es nueva.
   * Este método es mejor para crear NUEVAS entidades. Para actualizar, se recomienda
   * cargar la entidad existente y usar em.assign().
   * * @param domain La instancia de la clase Goal a guardar.
   * @returns Una nueva instancia de GoalEntity.
   */
  public static toEntity(domain: Goal): GoalEntity {
    // Al crear la entidad, usamos el constructor base, ignorando el `meta_padre`
    // y la inyección de la relación por simplicidad del mapeo.
    const entity = new GoalEntity(domain.nombre, domain.coste_subjetivo);
    // Asignamos el resto de las propiedades
    if (domain.id !== undefined) {
      // Si tiene ID, significa que se está intentando representar una entidad existente
      // (aunque para el guardado lo ideal es usar em.assign() con el objeto cargado)
      entity.id = domain.id;
    }
    entity.tipo = domain.getType().getValue();
    entity.estado = domain.estado;
    entity.penalizacion_restada = domain.penalizacion_restada;
    entity.puntos_ganados = domain.puntos_ganados;
    entity.descripcion = domain.descripcion; // Asumiendo que agregas un getter para descripción
    entity.deadLine = domain.deadline;
    return entity;
  }
}
