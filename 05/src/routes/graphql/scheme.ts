import { buildSchema } from 'graphql';

export const graphQLScheme = buildSchema(`
  # MemberType
  type MemberTypeEntity {
    id: ID!
    discount: Int!
    monthPostsLimit: Int!
  }

  input UpdateMemberTypeDto {
    discount: Int
    monthPostsLimit: Int
  }

  # Post
  type PostEntity {
    id: ID!
    title: String!
    content: String!
    userId: ID!
  }

  input CreatePostDto {
    title: String!
    content: String!
    userId: ID!
  }

  input UpdatePostDto {
    title: String
    content: String
  }

  # Profile
  type ProfileEntity {
    id: ID!
    avatar: String!
    sex: String!
    birthday: Int!
    country: String!
    street: String!
    city: String!
    memberTypeId: String!
    userId: ID!
  }

  input CreateProfileDto {
    avatar: String!
    sex: String!
    birthday: Int!
    country: String!
    street: String!
    city: String!
    memberTypeId: ID!
    userId: ID!
  }

  input UpdateProfileDto {
    avatar: String
    sex: String
    birthday: Int
    country: String
    street: String
    city: String
    memberTypeId: ID
  }

  # User
  type UserEntity {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    subscribedToUserIds: [ID]!
  }

  input CreateUserDto {
    firstName: String!
    lastName: String!
    email: String!
  }

  input UpdateUserDto {
    firstName: String
    lastName: String
    email: String
  }

  input SubscribeUserDto {
    userId: ID!
  }

  type Query {
    # MemberType
    memberTypes: [MemberTypeEntity]
    memberType(id: ID!): MemberTypeEntity

    # Posts
    posts: [PostEntity]
    post(id: ID!): PostEntity

    # Profile
    profiles: [ProfileEntity]
    profile(id: ID!): ProfileEntity

    # User
    users: [UserEntity]
    user(id: ID!): UserEntity
  }

  type Mutation {
    # MemberType
    updateMemberType(id: ID!, dto: UpdateMemberTypeDto!): MemberTypeEntity

    # Post
    createPost(dto: CreatePostDto!): PostEntity
    updatePost(id: ID!, dto: UpdatePostDto!): PostEntity
    deletePost(id: ID!): PostEntity

    # Profile
    createProfile(dto: CreateProfileDto!): ProfileEntity
    updateProfile(id: ID!, dto: UpdateProfileDto!): ProfileEntity
    deleteProfile(id: ID!): ProfileEntity

    # User
    createUser(dto: CreateUserDto!): UserEntity
    updateUser(id: ID!, dto: UpdateUserDto!): UserEntity
    deleteUser(id: ID!): UserEntity
    subscribeTo(id: ID!, dto: SubscribeUserDto!): UserEntity
    unsubscribeFrom(id: ID!, dto: SubscribeUserDto!): UserEntity
  }
`);
