import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import {
  idParamSchema,
  memberTypeIdParamSchema,
} from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import { memberTypeService } from './service';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async (): Promise<MemberTypeEntity[]> => {
    const foundMemberTypes = await memberTypeService.readAll.call(fastify);

    return foundMemberTypes;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<MemberTypeEntity> => {
      const { id } = request.params;
      const foundMemberType = await memberTypeService.read.call(fastify, id);

      return foundMemberType;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: memberTypeIdParamSchema,
      },
    },
    async (request): Promise<MemberTypeEntity> => {
      const { id } = request.params;
      const { body } = request;
      const updatedMemberType = await memberTypeService.update.call(
        fastify,
        id,
        body
      );

      return updatedMemberType;
    }
  );
};

export default plugin;
