import type { FastifyInstance } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import { NoRequiredEntity } from '../../utils/DB/errors/NoRequireEntity.error';
import {
  changeUserBodySchema as updateUserDtoSchema,
  createUserBodySchema as createUserDtoSchema,
  subscribeBodySchema as subscribeDtoSchema,
} from './schema';

export type CreateUserDto = FromSchema<typeof createUserDtoSchema>;
export type UpdateUserDto = FromSchema<typeof updateUserDtoSchema>;
export type SubscribeUserDto = FromSchema<typeof subscribeDtoSchema>;

export const userService = {
  async create(this: FastifyInstance, dto: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.db.users.create(dto);

    return createdUser;
  },

  async readAll(this: FastifyInstance): Promise<UserEntity[]> {
    const foundUsers = await this.db.users.findMany();

    return foundUsers;
  },

  async read(this: FastifyInstance, id: UserEntity['id']): Promise<UserEntity> {
    const foundUser = await this.db.users.findOne({
      key: 'id',
      equals: id,
    });

    if (foundUser === null) throw this.httpErrors.notFound('User not found');

    return foundUser;
  },

  async update(
    this: FastifyInstance,
    id: UserEntity['id'],
    dto: UpdateUserDto
  ): Promise<UserEntity> {
    let updatedUser: UserEntity | null = null;

    try {
      updatedUser = await this.db.users.change(id, dto);
    } catch (reason) {
      if (!(reason instanceof NoRequiredEntity)) throw reason;
    }

    if (updatedUser === null)
      throw this.httpErrors.badRequest('User not exist');

    return updatedUser;
  },

  async delete(
    this: FastifyInstance,
    id: UserEntity['id']
  ): Promise<UserEntity> {
    let deletedUser: UserEntity | null = null;

    try {
      deletedUser = await this.db.users.delete(id);
    } catch (reason) {
      if (!(reason instanceof NoRequiredEntity)) throw reason;
    }

    if (deletedUser === null)
      throw this.httpErrors.badRequest('User not exist');

    const deleteOperations: Promise<any>[] = [];

    (
      await this.db.users.findMany({
        key: 'subscribedToUserIds',
        inArray: id,
      })
    ).forEach((user) => {
      const { subscribedToUserIds: followerIds } = user;
      const updatedFollowerIds = followerIds.filter(
        (followerId) => followerId !== id
      );
      const deleteOperation = this.db.users
        .change(user.id, {
          subscribedToUserIds: updatedFollowerIds,
        })
        .catch((reason) => {
          if (!(reason instanceof NoRequiredEntity)) throw reason;
        });

      deleteOperations.push(deleteOperation);
    });

    (
      await this.db.profiles.findMany({
        key: 'userId',
        equals: id,
      })
    ).forEach((profile) => {
      const deleteOperation = this.db.profiles
        .delete(profile.id)
        .catch((reason) => {
          if (!(reason instanceof NoRequiredEntity)) throw reason;
        });

      deleteOperations.push(deleteOperation);
    });

    (
      await this.db.posts.findMany({
        key: 'userId',
        equals: id,
      })
    ).forEach((post) => {
      const deleteOperation = this.db.posts.delete(post.id).catch((reason) => {
        if (!(reason instanceof NoRequiredEntity)) throw reason;
      });

      deleteOperations.push(deleteOperation);
    });

    await Promise.all(deleteOperations);

    return deletedUser;
  },

  async subscribe(
    this: FastifyInstance,
    id: UserEntity['id'],
    dto: SubscribeUserDto,
    action: 'on' | 'off' = 'on'
  ): Promise<UserEntity> {
    const isFollowerExist =
      (await this.db.users.findOne({
        key: 'id',
        equals: id,
      })) !== null;

    if (!isFollowerExist) throw this.httpErrors.badRequest('User not exist');

    const { userId } = dto;
    const foundUser = await this.db.users.findOne({
      key: 'id',
      equals: userId,
    });

    if (foundUser === null)
      throw this.httpErrors.badRequest(
        `User, with userId: '${userId}', not exist`
      );

    const { subscribedToUserIds: followerIds } = foundUser;
    const followerIndex = followerIds.findIndex(
      (followerId) => followerId === id
    );
    const isFollower = followerIndex !== -1;

    if (action === 'off') {
      if (!isFollower) throw this.httpErrors.badRequest('User not subscriber');

      followerIds.splice(followerIndex, 1);
    } else {
      if (isFollower)
        throw this.httpErrors.badRequest('User already subscriber');

      followerIds.push(id);
    }

    let updatedUser: UserEntity | null = null;

    try {
      updatedUser = await this.db.users.change(userId, {
        subscribedToUserIds: followerIds,
      });
    } catch (reason) {
      if (!(reason instanceof NoRequiredEntity)) throw reason;
    }

    if (updatedUser === null)
      throw this.httpErrors.notFound(
        `User, with userId: '${userId}', not found`
      );

    return updatedUser;
  },
};
