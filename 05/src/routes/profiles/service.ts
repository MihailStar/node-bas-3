import type { FastifyInstance } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { NoRequiredEntity } from '../../utils/DB/errors/NoRequireEntity.error';
import {
  changeProfileBodySchema as updateProfileDtoSchema,
  createProfileBodySchema as createProfileDtoSchema,
} from './schema';

export type CreateProfileDto = FromSchema<typeof createProfileDtoSchema>;
export type UpdateProfileDto = FromSchema<typeof updateProfileDtoSchema>;

/**
 * @todo maybe add `dto.memberTypeId` exist check
 */
export const profileService = {
  async create(
    this: FastifyInstance,
    dto: CreateProfileDto
  ): Promise<ProfileEntity> {
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

    const isProfileExist =
      (await this.db.profiles.findOne({
        key: 'userId',
        equals: userId,
      })) !== null;

    if (isProfileExist)
      throw this.httpErrors.badRequest(
        `Profile, with userId: '${userId}', already exist`
      );

    const createdProfile = await this.db.profiles.create(dto);

    return createdProfile;
  },

  async readAll(this: FastifyInstance): Promise<ProfileEntity[]> {
    const foundProfiles = await this.db.profiles.findMany();

    return foundProfiles;
  },

  async read(
    this: FastifyInstance,
    id: ProfileEntity['id']
  ): Promise<ProfileEntity> {
    const foundProfile = await this.db.profiles.findOne({
      key: 'id',
      equals: id,
    });

    if (foundProfile === null)
      throw this.httpErrors.notFound('Profile not found');

    return foundProfile;
  },

  async update(
    this: FastifyInstance,
    id: ProfileEntity['id'],
    dto: UpdateProfileDto
  ): Promise<ProfileEntity> {
    let updatedProfile: ProfileEntity | null = null;

    try {
      updatedProfile = await this.db.profiles.change(id, dto);
    } catch (reason) {
      if (!(reason instanceof NoRequiredEntity)) throw reason;
    }

    if (updatedProfile === null)
      throw this.httpErrors.badRequest('Profile not exist');

    return updatedProfile;
  },

  async delete(
    this: FastifyInstance,
    id: ProfileEntity['id']
  ): Promise<ProfileEntity> {
    let deletedProfile: ProfileEntity | null = null;

    try {
      deletedProfile = await this.db.profiles.delete(id);
    } catch (reason) {
      if (!(reason instanceof NoRequiredEntity)) throw reason;
    }

    if (deletedProfile === null)
      throw this.httpErrors.badRequest('Profile not exist');

    return deletedProfile;
  },
};
