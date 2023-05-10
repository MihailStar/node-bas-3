# Учебные задания «Разработка на Node.js». GraphQL basics

Не включает [шаблон](https://github.com/nosbog/rsschool-nodejs-task-graphql/tree/92ac0cde17324c92d859431050becf31900530d3)

## Примеры запросов

### 2.1

```graphql
query Query {
  users {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }

  profiles {
    id
    avatar
    sex
    birthday
    country
    street
    city
    memberTypeId
    userId
  }

  posts {
    id
    title
    content
    userId
  }

  memberTypes {
    id
    discount
    monthPostsLimit
  }
}
```

### 2.2

```graphql
query Query($userId: ID!, $profileId: ID!, $postId: ID!, $memberTypeId: ID!) {
  user(id: $userId) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }

  profile(id: $profileId) {
    id
    avatar
    sex
    birthday
    country
    street
    city
    memberTypeId
    userId
  }

  post(id: $postId) {
    id
    title
    content
    userId
  }

  memberType(id: $memberTypeId) {
    id
    discount
    monthPostsLimit
  }
}
```

```json
{
  "userId": "{{userId}}",
  "profileId": "{{profileId}}",
  "postId": "{{postId}}",
  "memberTypeId": "{{memberTypeId}}"
}
```

### 2.8

```graphql
mutation Mutation($dto: CreateUserDto!) {
  createUser(dto: $dto) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }
}
```

```json
{
  "dto": {
    "firstName": "",
    "lastName": "",
    "email": ""
  }
}
```

### 2.9

```graphql
mutation Mutation($dto: CreateProfileDto!) {
  createProfile(dto: $dto) {
    id
    avatar
    sex
    birthday
    country
    street
    city
    memberTypeId
    userId
  }
}
```

```json
{
  "dto": {
    "avatar": "",
    "sex": "",
    "birthday": 0,
    "country": "",
    "street": "",
    "city": "",
    "memberTypeId": "{{memberTypeId}}",
    "userId": "{{userId}}"
  }
}
```

### 2.10

```graphql
mutation Mutation($dto: CreatePostDto!) {
  createPost(dto: $dto) {
    id
    title
    content
    userId
  }
}
```

```json
{
  "dto": {
    "title": "",
    "content": "",
    "userId": "{{userId}}"
  }
}
```

### 2.11

```graphql
mutation Mutation(
  $createUserDto: CreateUserDto!
  $createProfileDto: CreateProfileDto!
  $createPostDto: CreatePostDto!
) {
  createUser(dto: $createUserDto) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }

  createProfile(dto: $createProfileDto) {
    id
    avatar
    sex
    birthday
    country
    street
    city
    memberTypeId
    userId
  }

  createPost(dto: $createPostDto) {
    id
    title
    content
    userId
  }
}
```

```json
{
  "createUserDto": {
    "firstName": "",
    "lastName": "",
    "email": ""
  },

  "createProfileDto": {
    "avatar": "",
    "sex": "",
    "birthday": 0,
    "country": "",
    "street": "",
    "city": "",
    "memberTypeId": "{{memberTypeId}}",
    "userId": "{{userId}}"
  },

  "createPostDto": {
    "title": "",
    "content": "",
    "userId": "{{userId}}"
  }
}
```

### 2.12

```graphql
mutation Mutation($id: ID!, $dto: UpdateUserDto!) {
  updateUser(id: $id, dto: $dto) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }
}
```

```json
{
  "id": "{{userId}}",
  "dto": {
    "firstName": "",
    "lastName": "",
    "email": ""
  }
}
```

### 2.13

```graphql
mutation Mutation($id: ID!, $dto: UpdateProfileDto!) {
  updateProfile(id: $id, dto: $dto) {
    id
    avatar
    sex
    birthday
    country
    street
    city
    memberTypeId
    userId
  }
}
```

```json
{
  "id": "{{profileId}}",
  "dto": {
    "avatar": "",
    "sex": "",
    "birthday": 0,
    "country": "",
    "street": "",
    "city": "",
    "memberTypeId": "{{memberTypeId}}"
  }
}
```

### 2.14

```graphql
mutation Mutation($id: ID!, $dto: UpdatePostDto!) {
  updatePost(id: $id, dto: $dto) {
    id
    title
    content
    userId
  }
}
```

```json
{
  "id": "{{postId}}",
  "dto": {
    "title": "",
    "content": ""
  }
}
```

### 2.15

```graphql
mutation Mutation($id: ID!, $dto: UpdateMemberTypeDto!) {
  updateMemberType(id: $id, dto: $dto) {
    id
    discount
    monthPostsLimit
  }
}
```

```json
{
  "id": "{{memberTypeId}}",
  "dto": {
    "discount": 0,
    "monthPostsLimit": 0
  }
}
```

### 2.16

```graphql
mutation Mutation(
  $subscribeId: ID!
  $subscribeDto: SubscribeUserDto!
  $unsubscribeId: ID!
  $unsubscribeDto: SubscribeUserDto!
) {
  subscribeTo(id: $subscribeId, dto: $subscribeDto) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }

  unsubscribeFrom(id: $unsubscribeId, dto: $unsubscribeDto) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }
}
```

```json
{
  "subscribeId": "{{userId}}",
  "subscribeDto": {
    "userId": "{{userId}}"
  },

  "unsubscribeId": "{{userId}}",
  "unsubscribeDto": {
    "userId": "{{userId}}"
  }
}
```

### 2.17

```graphql
mutation Mutation(
  $updateUserId: ID!
  $updateUserDto: UpdateUserDto!
  $updateProfileId: ID!
  $updateProfileDto: UpdateProfileDto!
  $updatePostId: ID!
  $updatePostDto: UpdatePostDto!
  $updateMemberTypeId: ID!
  $updateMemberTypeDto: UpdateMemberTypeDto!
  $subscribeId: ID!
  $subscribeDto: SubscribeUserDto!
  $unsubscribeId: ID!
  $unsubscribeDto: SubscribeUserDto!
) {
  updateUser(id: $updateUserId, dto: $updateUserDto) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }

  updateProfile(id: $updateProfileId, dto: $updateProfileDto) {
    id
    avatar
    sex
    birthday
    country
    street
    city
    memberTypeId
    userId
  }

  updatePost(id: $updatePostId, dto: $updatePostDto) {
    id
    title
    content
    userId
  }

  updateMemberType(id: $updateMemberTypeId, dto: $updateMemberTypeDto) {
    id
    discount
    monthPostsLimit
  }

  subscribeTo(id: $subscribeId, dto: $subscribeDto) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }

  unsubscribeFrom(id: $unsubscribeId, dto: $unsubscribeDto) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }
}
```

```json
{
  "updateUserId": "{{userId}}",
  "updateUserDto": {
    "firstName": "",
    "lastName": "",
    "email": ""
  },

  "subscribeId": "{{userId}}",
  "subscribeDto": {
    "userId": "{{userId}}"
  },

  "unsubscribeId": "{{userId}}",
  "unsubscribeDto": {
    "userId": "{{userId}}"
  },

  "updateProfileId": "{{profileId}}",
  "updateProfileDto": {
    "avatar": "",
    "sex": "",
    "birthday": 0,
    "country": "",
    "street": "",
    "city": "",
    "memberTypeId": "{{memberTypeId}}"
  },

  "updatePostId": "{{postId}}",
  "updatePostDto": {
    "title": "",
    "content": ""
  },

  "updateMemberTypeId": "{{memberTypeId}}",
  "updateMemberTypeDto": {
    "discount": 0,
    "monthPostsLimit": 0
  }
}
```
