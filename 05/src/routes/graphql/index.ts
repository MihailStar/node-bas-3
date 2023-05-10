import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { ExecutionResult, graphql, parse, validate } from 'graphql';
import * as graphqlDepthLimit from 'graphql-depth-limit';
import { graphQLResolver } from './resolver';
import { graphqlBodySchema } from './schema';
import { graphQLScheme } from './scheme';

const DEPTH_LIMIT = 6;

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async (request): Promise<ExecutionResult> => {
      const { query, mutation, variables } = request.body;
      /**
       * @todo try rewriting without re-running validation
       */
      const errors = validate(graphQLScheme, parse(query ?? mutation), [
        graphqlDepthLimit(DEPTH_LIMIT),
      ]);
      const hasErrors = errors.length > 0;

      if (hasErrors) {
        fastify.httpErrors.badRequest('GraphQL query depth limit exceeded');
      }

      const executionResult = await graphql({
        schema: graphQLScheme,
        source: query ?? mutation,
        variableValues: variables,
        rootValue: graphQLResolver,
        contextValue: fastify,
      });

      return executionResult;
    }
  );
};

export default plugin;
