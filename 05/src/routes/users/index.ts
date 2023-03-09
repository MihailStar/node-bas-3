import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import { idParamSchema, uuidParamSchema } from '../../utils/reusedSchemas';
import {
  changeUserBodySchema,
  createUserBodySchema,
  subscribeBodySchema,
} from './schema';
import { userService } from './service';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async (): Promise<UserEntity[]> => {
    const foundUsers = await userService.readAll.call(fastify);

    return foundUsers;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<UserEntity> => {
      const { id } = request.params;
      const foundUser = await userService.read.call(fastify, id);

      return foundUser;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async (request): Promise<UserEntity> => {
      const { body } = request;
      const createdUser = await userService.create.call(fastify, body);

      return createdUser;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: uuidParamSchema,
      },
    },
    async (request): Promise<UserEntity> => {
      const { id } = request.params;
      const deletedUser = await userService.delete.call(fastify, id);

      return deletedUser;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: uuidParamSchema,
      },
    },
    async (request): Promise<UserEntity> => {
      const { id } = request.params;
      const { body } = request;
      const updatedUser = await userService.update.call(fastify, id, body);

      return updatedUser;
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: uuidParamSchema,
      },
    },
    async (request): Promise<UserEntity> => {
      const { id } = request.params;
      const { body } = request;
      const updatedUser = await userService.subscribe.call(
        fastify,
        id,
        body,
        'on'
      );

      return updatedUser;
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: uuidParamSchema,
      },
    },
    async (request): Promise<UserEntity> => {
      const { id } = request.params;
      const { body } = request;
      const updatedUser = await userService.subscribe.call(
        fastify,
        id,
        body,
        'off'
      );

      return updatedUser;
    }
  );
};

export default plugin;
