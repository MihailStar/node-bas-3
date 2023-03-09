import { NotFoundException } from '@nestjs/common';

export class EntityStorage<
  Entity extends { id: EntityId },
  EntityId extends string | number = string,
> {
  private storage: Entity[] = [];

  get(): Entity[];

  /**
   * @throws {NotFoundException}
   * @returns [Entity, EntityIndex]
   */
  get(entityId: EntityId): [Entity, number];

  get(entityId?: EntityId): Entity[] | [Entity, number] {
    if (entityId === undefined) {
      return this.storage;
    }

    const entityIndex = this.getIndex(entityId);
    const entity = this.storage[entityIndex];

    return [entity, entityIndex];
  }

  /**
   * @returns [Entity, EntityIndex]
   */
  set(
    entitiesOrEntity: Entity,
    entityIndex = this.storage.length,
  ): [Entity, number] {
    this.storage[entityIndex] = entitiesOrEntity;

    return [entitiesOrEntity, entityIndex];
  }

  has(entityId: EntityId): boolean {
    const hasEntity =
      this.storage.find((entity) => entity.id === entityId) !== undefined;

    return hasEntity;
  }

  /**
   * @throws {NotFoundException}
   * @returns [Entity, EntityIndex]
   */
  delete(entityId: EntityId): [Entity, number] {
    const entityIndex = this.getIndex(entityId);
    const entity = this.storage[entityIndex];

    this.storage.splice(entityIndex, 1);

    return [entity, entityIndex];
  }

  /**
   * getIndexOrThrowException
   * @throws {NotFoundException}
   */
  private getIndex(entityId: EntityId): number {
    const entityIndex = this.storage.findIndex(
      (entity) => entity.id === entityId,
    );

    if (entityIndex === -1) {
      throw new NotFoundException(`Entity, with id: ${entityId}, not found`);
    }

    return entityIndex;
  }
}
