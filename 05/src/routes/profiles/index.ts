import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { idParamSchema, uuidParamSchema } from '../../utils/reusedSchemas';
import { changeProfileBodySchema, createProfileBodySchema } from './schema';
import { profileService } from './service';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async (): Promise<ProfileEntity[]> => {
    const foundProfiles = await profileService.readAll.call(fastify);

    return foundProfiles;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<ProfileEntity> => {
      const { id } = request.params;
      const foundProfile = await profileService.read.call(fastify, id);

      return foundProfile;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async (request): Promise<ProfileEntity> => {
      const { body } = request;
      const createdProfile = await profileService.create.call(fastify, body);

      return createdProfile;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: uuidParamSchema,
      },
    },
    async (request): Promise<ProfileEntity> => {
      const { id } = request.params;
      const deletedProfile = await profileService.delete.call(fastify, id);

      return deletedProfile;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: uuidParamSchema,
      },
    },
    async (request): Promise<ProfileEntity> => {
      const { id } = request.params;
      const { body } = request;
      const updatedProfile = await profileService.update.call(
        fastify,
        id,
        body
      );

      return updatedProfile;
    }
  );
};

export default plugin;
