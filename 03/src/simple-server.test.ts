import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import type { User, UserDto } from './resource/users/users-model.js';
import { simpleServer } from './simple-server.js';

const request = supertest(simpleServer.server);

describe('Simple server', () => {
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
      const response = await request.post(`/api/users`).send(userDto);
      const { data } = response.body as { data: User };

      expect(response.status).toBe(201);
      expect(data).toEqual({ id: data.id, ...userDto });

      testedUser = data;
    });

    test('Checks body', async () => {
      const response = await request.post(`/api/users`).send({});
      const { data } = response.body as { data: null };

      expect(response.status).toBe(400);
      expect(data).toBe(null);
    });
  });

  describe('Read all', () => {
    test('Returns Users', async () => {
      const response = await request.get(`/api/users`).send();
      const { data } = response.body as { data: User[] };

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data[data.length - 1]).toEqual(testedUser);
    });
  });

  describe('Read', () => {
    test('Returns User', async () => {
      const response = await request.get(`/api/users/${testedUser.id}`).send();
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual(testedUser);
    });

    test('Returns null', async () => {
      const response = await request.get(`/api/users/${notExistUserId}`).send();
      const { data } = response.body as { data: null };

      expect(response.status).toBe(404);
      expect(data).toBe(null);
    });

    test('Checks id', async () => {
      const response = await request.get(`/api/users/${notValidUserId}`).send();
      const { data } = response.body as { data: null };

      expect(response.status).toBe(400);
      expect(data).toBe(null);
    });
  });

  describe('Update', () => {
    const userDto: UserDto = {
      username: 'new_username',
      age: 33,
      hobbies: ['new_hobby'],
    };

    test('Returns User', async () => {
      const response = await request
        .put(`/api/users/${testedUser.id}`)
        .send(userDto);
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual({ id: testedUser.id, ...userDto });

      testedUser = data;
    });

    test('Returns null', async () => {
      const response = await request
        .put(`/api/users/${notExistUserId}`)
        .send(userDto);
      const { data } = response.body as { data: null };

      expect(response.status).toBe(404);
      expect(data).toBe(null);
    });

    test('Checks id', async () => {
      const response = await request
        .put(`/api/users/${notValidUserId}`)
        .send(userDto);
      const { data } = response.body as { data: null };

      expect(response.status).toBe(400);
      expect(data).toBe(null);
    });

    test('Checks body', async () => {
      const response = await request
        .put(`/api/users/${testedUser.id}`)
        .send({});
      const { data } = response.body as { data: null };

      expect(response.status).toBe(400);
      expect(data).toBe(null);
    });
  });

  describe('Delete', () => {
    test('Returns empty body', async () => {
      const response = await request
        .delete(`/api/users/${testedUser.id}`)
        .send();

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    test('Checks id', async () => {
      const response = await request
        .delete(`/api/users/${notValidUserId}`)
        .send();
      const { data } = response.body as { data: null };

      expect(response.status).toBe(400);
      expect(data).toBe(null);
    });
  });

  describe('Create and Update', () => {
    test('Create', async () => {
      const userDto: UserDto = {
        username: 'username',
        age: 33,
        hobbies: ['hobby'],
      };
      const response = await request.post(`/api/users`).send(userDto);
      const { data } = response.body as { data: User };

      expect(response.status).toBe(201);
      expect(data).toEqual({ id: data.id, ...userDto });

      testedUser = data;
    });

    test('Read before Create', async () => {
      const response = await request.get(`/api/users/${testedUser.id}`).send();
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual(testedUser);
    });

    test('Update', async () => {
      const userDto: UserDto = {
        username: 'new_username',
        age: 33,
        hobbies: ['new_hobby'],
      };
      const response = await request
        .put(`/api/users/${testedUser.id}`)
        .send(userDto);
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual({ id: testedUser.id, ...userDto });

      testedUser = data;
    });

    test('Read before Update', async () => {
      const response = await request.get(`/api/users/${testedUser.id}`).send();
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual(testedUser);
    });
  });

  describe('Create and Delete', () => {
    test('Create', async () => {
      const userDto: UserDto = {
        username: 'username',
        age: 33,
        hobbies: ['hobby'],
      };
      const response = await request.post(`/api/users`).send(userDto);
      const { data } = response.body as { data: User };

      expect(response.status).toBe(201);
      expect(data).toEqual({ id: data.id, ...userDto });

      testedUser = data;
    });

    test('Read before Create', async () => {
      const response = await request.get(`/api/users/${testedUser.id}`).send();
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual(testedUser);
    });

    test('Delete', async () => {
      const response = await request
        .delete(`/api/users/${testedUser.id}`)
        .send();

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    test('Read before Delete', async () => {
      const response = await request.get(`/api/users/${testedUser.id}`).send();
      const { data } = response.body as { data: null };

      expect(response.status).toBe(404);
      expect(data).toBe(null);
    });
  });

  describe('Create and Update and Delete', () => {
    test('Create', async () => {
      const userDto: UserDto = {
        username: 'username',
        age: 33,
        hobbies: ['hobby'],
      };
      const response = await request.post(`/api/users`).send(userDto);
      const { data } = response.body as { data: User };

      expect(response.status).toBe(201);
      expect(data).toEqual({ id: data.id, ...userDto });

      testedUser = data;
    });

    test('Read before Create', async () => {
      const response = await request.get(`/api/users/${testedUser.id}`).send();
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual(testedUser);
    });

    test('Update', async () => {
      const userDto: UserDto = {
        username: 'new_username',
        age: 33,
        hobbies: ['new_hobby'],
      };
      const response = await request
        .put(`/api/users/${testedUser.id}`)
        .send(userDto);
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual({ id: testedUser.id, ...userDto });

      testedUser = data;
    });

    test('Read before Update', async () => {
      const response = await request.get(`/api/users/${testedUser.id}`).send();
      const { data } = response.body as { data: User };

      expect(response.status).toBe(200);
      expect(data).toEqual(testedUser);
    });

    test('Delete', async () => {
      const response = await request
        .delete(`/api/users/${testedUser.id}`)
        .send();

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    test('Read before Delete', async () => {
      const response = await request.get(`/api/users/${testedUser.id}`).send();
      const { data } = response.body as { data: null };

      expect(response.status).toBe(404);
      expect(data).toBe(null);
    });
  });
});
