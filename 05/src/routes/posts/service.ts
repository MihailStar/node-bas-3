import type { FastifyInstance } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';
import { NoRequiredEntity } from '../../utils/DB/errors/NoRequireEntity.error';
import {
  changePostBodySchema as updatePostDtoSchema,
  createPostBodySchema as createPostDtoSchema,
} from './schema';

export type CreatePostDto = FromSchema<typeof createPostDtoSchema>;
export type UpdatePostDto = FromSchema<typeof updatePostDtoSchema>;

export const postService = {
  async create(this: FastifyInstance, dto: CreatePostDto): Promise<PostEntity> {
    const { userId } = dto;
    const isUserExist =
      (await this.db.users.findOne({
        key: 'id',
        equals: userId,
      })) !== null;

    if (!isUserExist)
      throw this.httpErrors.badRequest(
        `User, with userId: '${userId}', not exist`
      );

    const createdPost = await this.db.posts.create(dto);

    return createdPost;
  },

  async readAll(this: FastifyInstance): Promise<PostEntity[]> {
    const foundPosts = await this.db.posts.findMany();

    return foundPosts;
  },

  async read(this: FastifyInstance, id: PostEntity['id']): Promise<PostEntity> {
    const foundPost = await this.db.posts.findOne({
      key: 'id',
      equals: id,
    });

    if (foundPost === null) throw this.httpErrors.notFound('Post not found');

    return foundPost;
  },

  async update(
    this: FastifyInstance,
    id: PostEntity['id'],
    dto: UpdatePostDto
  ): Promise<PostEntity> {
    let updatedPost: PostEntity | null = null;

    try {
      updatedPost = await this.db.posts.change(id, dto);
    } catch (reason) {
      if (!(reason instanceof NoRequiredEntity)) throw reason;
    }

    if (updatedPost === null)
      throw this.httpErrors.badRequest('Post not exist');

    return updatedPost;
  },

  async delete(
    this: FastifyInstance,
    id: PostEntity['id']
  ): Promise<PostEntity> {
    let deletedPost: PostEntity | null = null;

    try {
      deletedPost = await this.db.posts.delete(id);
    } catch (reason) {
      if (!(reason instanceof NoRequiredEntity)) throw reason;
    }

    if (deletedPost === null)
      throw this.httpErrors.badRequest('Post not exist');

    return deletedPost;
  },
};
