import { FastifyInstance } from 'fastify';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import {
  memberTypeService,
  UpdateMemberTypeDto,
} from '../member-types/service';
import { CreatePostDto, postService, UpdatePostDto } from '../posts/service';
import {
  CreateProfileDto,
  profileService,
  UpdateProfileDto,
} from '../profiles/service';
import {
  CreateUserDto,
  SubscribeUserDto,
  UpdateUserDto,
  userService,
} from '../users/service';
import { graphQLValidator } from './validator';

export const graphQLResolver = {
  async memberTypes(
    _data: Record<string, never>,
    context: FastifyInstance
  ): Promise<MemberTypeEntity[]> {
    const foundMemberTypes = await memberTypeService.readAll.call(context);

    return foundMemberTypes;
  },

  async memberType(
    data: { id: MemberTypeEntity['id'] },
    context: FastifyInstance
  ): Promise<MemberTypeEntity> {
    const { id } = data;
    const foundMemberType = await memberTypeService.read.call(context, id);

    return foundMemberType;
  },

  async updateMemberType(
    data: { id: MemberTypeEntity['id']; dto: UpdateMemberTypeDto },
    context: FastifyInstance
  ): Promise<MemberTypeEntity> {
    const { id: memberTypeId } = graphQLValidator.memberTypeIdValidate.call(
      context,
      data
    );
    const { dto } = data;
    const updatedMemberType = await memberTypeService.update.call(
      context,
      memberTypeId,
      dto
    );

    return updatedMemberType;
  },

  async posts(
    _data: Record<string, never>,
    context: FastifyInstance
  ): Promise<PostEntity[]> {
    const foundPosts = await postService.readAll.call(context);

    return foundPosts;
  },

  async post(
    data: { id: PostEntity['id'] },
    context: FastifyInstance
  ): Promise<PostEntity> {
    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const foundPost = await postService.read.call(context, uuid);

    return foundPost;
  },

  async createPost(
    data: { dto: CreatePostDto },
    context: FastifyInstance
  ): Promise<PostEntity> {
    graphQLValidator.uuidValidate.call(context, { id: data.dto.userId });

    const { dto } = data;
    const createdPost = await postService.create.call(context, dto);

    return createdPost;
  },

  async updatePost(
    data: { id: PostEntity['id']; dto: UpdatePostDto },
    context: FastifyInstance
  ): Promise<PostEntity> {
    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const { dto } = data;
    const updatedPost = await postService.update.call(context, uuid, dto);

    return updatedPost;
  },

  async deletePost(
    data: { id: PostEntity['id'] },
    context: FastifyInstance
  ): Promise<PostEntity> {
    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const deletedPost = await postService.delete.call(context, uuid);

    return deletedPost;
  },

  async profiles(
    _data: Record<string, never>,
    context: FastifyInstance
  ): Promise<ProfileEntity[]> {
    const foundProfiles = await profileService.readAll.call(context);

    return foundProfiles;
  },

  async profile(
    data: { id: ProfileEntity['id'] },
    context: FastifyInstance
  ): Promise<ProfileEntity> {
    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const foundProfile = await profileService.read.call(context, uuid);

    return foundProfile;
  },

  async createProfile(
    data: { dto: CreateProfileDto },
    context: FastifyInstance
  ): Promise<ProfileEntity> {
    graphQLValidator.uuidValidate.call(context, { id: data.dto.userId });
    graphQLValidator.memberTypeIdValidate.call(context, {
      id: data.dto.memberTypeId,
    });

    const { dto } = data;
    const createdProfile = await profileService.create.call(context, dto);

    return createdProfile;
  },

  async updateProfile(
    data: { id: ProfileEntity['id']; dto: UpdateProfileDto },
    context: FastifyInstance
  ): Promise<ProfileEntity> {
    if (data.dto.memberTypeId)
      graphQLValidator.memberTypeIdValidate.call(context, {
        id: data.dto.memberTypeId,
      });

    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const { dto } = data;
    const updatedProfile = await profileService.update.call(context, uuid, dto);

    return updatedProfile;
  },

  async deleteProfile(
    data: { id: ProfileEntity['id'] },
    context: FastifyInstance
  ): Promise<ProfileEntity> {
    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const deletedProfile = await profileService.delete.call(context, uuid);

    return deletedProfile;
  },

  async users(
    _data: Record<string, never>,
    context: FastifyInstance
  ): Promise<UserEntity[]> {
    const foundUsers = await userService.readAll.call(context);

    return foundUsers;
  },

  async user(
    data: { id: UserEntity['id'] },
    context: FastifyInstance
  ): Promise<UserEntity> {
    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const foundUser = await userService.read.call(context, uuid);

    return foundUser;
  },

  async createUser(
    data: { dto: CreateUserDto },
    context: FastifyInstance
  ): Promise<UserEntity> {
    const { dto } = data;
    const createdUser = await userService.create.call(context, dto);

    return createdUser;
  },

  async updateUser(
    data: { id: UserEntity['id']; dto: UpdateUserDto },
    context: FastifyInstance
  ): Promise<UserEntity> {
    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const { dto } = data;
    const updatedUser = await userService.update.call(context, uuid, dto);

    return updatedUser;
  },

  async deleteUser(
    data: { id: UserEntity['id'] },
    context: FastifyInstance
  ): Promise<UserEntity> {
    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const deletedUser = await userService.delete.call(context, uuid);

    return deletedUser;
  },

  async subscribeTo(
    data: { id: UserEntity['id']; dto: SubscribeUserDto },
    context: FastifyInstance
  ): Promise<UserEntity> {
    graphQLValidator.uuidValidate.call(context, { id: data.dto.userId });

    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const { dto } = data;
    const updatedUser = await userService.subscribe.call(
      context,
      uuid,
      dto,
      'on'
    );

    return updatedUser;
  },

  async unsubscribeFrom(
    data: { id: UserEntity['id']; dto: SubscribeUserDto },
    context: FastifyInstance
  ): Promise<UserEntity> {
    graphQLValidator.uuidValidate.call(context, { id: data.dto.userId });

    const { id: uuid } = graphQLValidator.uuidValidate.call(context, data);
    const { dto } = data;
    const updatedUser = await userService.subscribe.call(
      context,
      uuid,
      dto,
      'off'
    );

    return updatedUser;
  },
};
