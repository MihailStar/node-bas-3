import type { FastifyInstance } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { NoRequiredEntity } from '../../utils/DB/errors/NoRequireEntity.error';
import { changeMemberTypeBodySchema as updateMemberTypeDtoSchema } from './schema';

export type UpdateMemberTypeDto = FromSchema<typeof updateMemberTypeDtoSchema>;

export const memberTypeService = {
  async readAll(this: FastifyInstance): Promise<MemberTypeEntity[]> {
    const foundMemberTypes = await this.db.memberTypes.findMany();

    return foundMemberTypes;
  },

  async read(
    this: FastifyInstance,
    id: MemberTypeEntity['id']
  ): Promise<MemberTypeEntity> {
    const foundMemberType = await this.db.memberTypes.findOne({
      key: 'id',
      equals: id,
    });

    if (foundMemberType === null)
      throw this.httpErrors.notFound('Member type not found');

    return foundMemberType;
  },

  async update(
    this: FastifyInstance,
    id: MemberTypeEntity['id'],
    dto: UpdateMemberTypeDto
  ): Promise<MemberTypeEntity> {
    let updatedMemberType: MemberTypeEntity | null = null;

    try {
      updatedMemberType = await this.db.memberTypes.change(id, dto);
    } catch (reason) {
      if (!(reason instanceof NoRequiredEntity)) throw reason;
    }

    if (updatedMemberType === null)
      throw this.httpErrors.badRequest('Member type not exist');

    return updatedMemberType;
  },
};
