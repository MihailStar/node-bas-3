import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { FastifyInstance } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import {
  idParamSchema as idSchema,
  memberTypeIdParamSchema as memberTypeIdSchema,
  uuidParamSchema as uuidSchema,
} from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema as updateMemberTypeDTOSchema } from '../member-types/schema';
import type { UpdateMemberTypeDto } from '../member-types/service';
import {
  changePostBodySchema as updatePostDtoSchema,
  createPostBodySchema as createPostDtoSchema,
} from '../posts/schema';
import type { CreatePostDto, UpdatePostDto } from '../posts/service';
import {
  changeProfileBodySchema as updateProfileDtoSchema,
  createProfileBodySchema as createProfileDtoSchema,
} from '../profiles/schema';
import type { CreateProfileDto, UpdateProfileDto } from '../profiles/service';
import {
  changeUserBodySchema as updateUserDtoSchema,
  createUserBodySchema as createUserDtoSchema,
  subscribeBodySchema as subscribeDtoSchema,
} from '../users/schema';
import type {
  CreateUserDto,
  SubscribeUserDto,
  UpdateUserDto,
} from '../users/service';

type Id = FromSchema<typeof idSchema>;
type Uuid = FromSchema<typeof uuidSchema>;
type MemberTypeId = FromSchema<typeof memberTypeIdSchema>;

const ajv = addFormats(new Ajv());

const validator = {
  id: ajv.compile<Id>(idSchema),

  uuid: ajv.compile<Uuid>(uuidSchema),

  memberTypeId: ajv.compile<MemberTypeId>(memberTypeIdSchema),

  updateMemberTypeDto: ajv.compile<UpdateMemberTypeDto>(
    updateMemberTypeDTOSchema
  ),

  createPostDto: ajv.compile<CreatePostDto>(createPostDtoSchema),

  updatePostDto: ajv.compile<UpdatePostDto>(updatePostDtoSchema),

  createProfileDto: ajv.compile<CreateProfileDto>(createProfileDtoSchema),

  updateProfileDto: ajv.compile<UpdateProfileDto>(updateProfileDtoSchema),

  createUserDto: ajv.compile<CreateUserDto>(createUserDtoSchema),

  updateUserDto: ajv.compile<UpdateUserDto>(updateUserDtoSchema),

  subscribeUserDto: ajv.compile<SubscribeUserDto>(subscribeDtoSchema),
};

export const graphQLValidator = {
  idValidate(this: FastifyInstance, value: Record<string, unknown>): Id {
    const isValid = validator.id(value);

    if (!isValid)
      throw this.httpErrors.badRequest(validator.id.errors?.[0].message);

    return value;
  },

  uuidValidate(this: FastifyInstance, value: Record<string, unknown>): Uuid {
    const isValid = validator.uuid(value);

    if (!isValid)
      throw this.httpErrors.badRequest(validator.uuid.errors?.[0].message);

    return value;
  },

  memberTypeIdValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): MemberTypeId {
    const isValid = validator.memberTypeId(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.memberTypeId.errors?.[0].message
      );

    return value;
  },

  updateMemberTypeDtoValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): UpdateMemberTypeDto {
    const isValid = validator.updateMemberTypeDto(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.updateMemberTypeDto.errors?.[0].message
      );

    return value;
  },

  createPostDtoValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): CreatePostDto {
    const isValid = validator.createPostDto(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.createPostDto.errors?.[0].message
      );

    return value;
  },

  updatePostDtoValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): UpdatePostDto {
    const isValid = validator.updatePostDto(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.updatePostDto.errors?.[0].message
      );

    return value;
  },

  createProfileDtoValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): CreateProfileDto {
    const isValid = validator.createProfileDto(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.createProfileDto.errors?.[0].message
      );

    return value;
  },

  updateProfileDtoValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): UpdateProfileDto {
    const isValid = validator.updateProfileDto(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.updateProfileDto.errors?.[0].message
      );

    return value;
  },

  createUserDtoValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): CreateUserDto {
    const isValid = validator.createUserDto(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.createUserDto.errors?.[0].message
      );

    return value;
  },

  updateUserDtoValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): UpdateUserDto {
    const isValid = validator.updateUserDto(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.updateUserDto.errors?.[0].message
      );

    return value;
  },

  subscribeUserDtoValidate(
    this: FastifyInstance,
    value: Record<string, unknown>
  ): SubscribeUserDto {
    const isValid = validator.subscribeUserDto(value);

    if (!isValid)
      throw this.httpErrors.badRequest(
        validator.subscribeUserDto.errors?.[0].message
      );

    return value;
  },
};
