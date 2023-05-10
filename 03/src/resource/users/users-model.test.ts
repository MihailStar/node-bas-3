import { describe, expect, test } from '@jest/globals';
import { validate, version } from 'uuid';
import type { User, UserDto } from './users-model.js';
import { UsersModel } from './users-model.js';

describe('Users model', () => {
  let testedUser: User;

  const notExistUserId: User['id'] = '8cb2ec8c-7dba-45dc-91f5-266286e1b11b';
  const notValidUserId: User['id'] = '8cb2ec8c-7dba-xxxx-91f5-266286e1b11b';

  describe('Create', () => {
    const userDto: UserDto = {
      username: 'username',
      age: 33,
      hobbies: ['hobby'],
    };

    test('Returns User', async () => {
      const result = await UsersModel.create(userDto);

      expect(validate(result.id) && version(result.id) === 4).toBe(true);
      expect(result).toEqual({ id: result.id, ...userDto });

      testedUser = result;
    });
  });

  describe('Read all', () => {
    test('Returns Users', async () => {
      const result = await UsersModel.read();

      expect(Array.isArray(result)).toBe(true);
      expect(result[result.length - 1]).toEqual(testedUser);
    });
  });

  describe('Read', () => {
    test('Returns User', async () => {
      const result = await UsersModel.read(testedUser.id);

      expect(result).not.toBe(null);
      expect(result).toEqual(testedUser);
    });

    test('Returns null', async () => {
      const result = await UsersModel.read(notExistUserId);

      expect(result).toBe(null);
    });
  });

  describe('Update', () => {
    const userDto: UserDto = {
      username: 'new_username',
      age: 33,
      hobbies: ['new_hobby'],
    };

    test('Returns User', async () => {
      const result = (await UsersModel.update(testedUser.id, userDto)) as User;

      expect(result).not.toBe(null);
      expect(result).toEqual({ id: testedUser.id, ...userDto });

      testedUser = result;
    });

    test('Returns null', async () => {
      const result = await UsersModel.update(notExistUserId, userDto);

      expect(result).toBe(null);
    });
  });

  describe('Delete', () => {
    test('Returns User', async () => {
      const result = await UsersModel.delete(testedUser.id);

      expect(result).not.toBe(null);
      expect(result).toEqual(testedUser);
    });

    test('Returns null', async () => {
      const result = await UsersModel.delete(testedUser.id);

      expect(result).toBe(null);
    });
  });

  describe('Checks Id', () => {
    test('Returns true', async () => {
      [testedUser.id, notExistUserId].forEach((item) => {
        expect(UsersModel.isId(item)).toBe(true);
      });
    });

    test('Returns false', async () => {
      [notValidUserId, undefined].forEach((item) => {
        expect(UsersModel.isId(item)).toBe(false);
      });
    });
  });

  describe('Checks Dto', () => {
    test('Returns true', async () => {
      [
        testedUser,
        { username: 'username', age: 33, hobbies: ['hobby'] },
        { username: 'username', age: 33, hobbies: [] },
      ].forEach((item) => {
        expect(UsersModel.isDto(item)).toBe(true);
      });
    });

    test('Returns false', async () => {
      [
        { username: 'username' },
        { age: 33 },
        { hobbies: ['hobby'] },
        { username: 'username', age: 33 },
        { age: 33, hobbies: ['hobby'] },
        { username: 'username', hobbies: ['hobby'] },
        undefined,
      ].forEach((item) => {
        expect(UsersModel.isDto(item)).toBe(false);
      });
    });
  });
});
