import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';
import { idParamSchema, uuidParamSchema } from '../../utils/reusedSchemas';
import { changePostBodySchema, createPostBodySchema } from './schema';
import { postService } from './service';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async (): Promise<PostEntity[]> => {
    const foundPosts = await postService.readAll.call(fastify);

    return foundPosts;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<PostEntity> => {
      const { id } = request.params;
      const foundPost = await postService.read.call(fastify, id);

      return foundPost;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async (request): Promise<PostEntity> => {
      const { body } = request;
      const createdPost = await postService.create.call(fastify, body);

      return createdPost;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: uuidParamSchema,
      },
    },
    async (request): Promise<PostEntity> => {
      const { id } = request.params;
      const deletedPost = await postService.delete.call(fastify, id);

      return deletedPost;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changePostBodySchema,
        params: uuidParamSchema,
      },
    },
    async (request): Promise<PostEntity> => {
      const { id } = request.params;
      const { body } = request;
      const updatedPost = await postService.update.call(fastify, id, body);

      return updatedPost;
    }
  );
};

export default plugin;
