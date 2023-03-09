import { v4 as uuid, validate, version } from 'uuid';
import { Storage } from '../../storage/storage.js';
import { isKeyInObject } from '../../utility/is-key-in-object.js';
import { isObject } from '../../utility/is-object.js';
import { isPositiveInteger } from '../../utility/is-positive-integer.js';
import { isPositiveStringArray } from '../../utility/is-positive-string-array.js';
import { isPositiveString } from '../../utility/is-positive-string.js';
import { isString } from '../../utility/is-string.js';

export type UserDto = { username: string; age: number; hobbies: string[] };
export type User = { id: string } & UserDto;

const keyToValidator: Record<keyof UserDto, (value: unknown) => boolean> = {
  username: isPositiveString,
  age: isPositiveInteger,
  hobbies: isPositiveStringArray,
};

export class UsersModel {
  private static readonly storage = new Storage<User>('users');

  static async create(userDto: UserDto): Promise<User> {
    const users = await this.storage.get();

    const newUser: User = { id: uuid(), ...userDto };
    users.push(newUser);

    await this.storage.set(users);

    return newUser;
  }

  static async read(): Promise<User[]>;
  static async read(id: User['id']): Promise<User | null>;
  static async read(id?: User['id']): Promise<User[] | User | null> {
    const users = await this.storage.get();

    if (id === undefined) {
      return users;
    }

    const userIndex = users.findIndex(({ id: userId }) => userId === id);
    const user = users[userIndex];

    if (userIndex === -1) {
      return null;
    }

    return user;
  }

  static async update(id: User['id'], userDto: UserDto): Promise<User | null> {
    const users = await this.storage.get();

    const userIndex = users.findIndex(({ id: userId }) => userId === id);
    const user = users[userIndex];

    if (userIndex === -1) {
      return null;
    }

    const newUser: User = { id: user.id, ...userDto };
    users.splice(userIndex, 1, newUser);

    await this.storage.set(users);

    return newUser;
  }

  static async delete(id: User['id']): Promise<User | null> {
    const users = await this.storage.get();

    const userIndex = users.findIndex(({ id: userId }) => userId === id);
    const user = users[userIndex];

    if (userIndex === -1) {
      return null;
    }

    users.splice(userIndex, 1);

    await this.storage.set(users);

    return user;
  }

  static isId(this: void, value: unknown): value is User['id'] {
    return isString(value) && validate(value) && version(value) === 4;
  }

  /**
   * @todo add validation for left fields
   */
  static isDto(this: void, value: unknown): value is UserDto {
    return (
      isObject(value) &&
      Object.entries(keyToValidator).every(([key, validator]) => {
        if (!isKeyInObject(key, value)) {
          return false;
        }

        return validator(value[key]);
      })
    );
  }
}
