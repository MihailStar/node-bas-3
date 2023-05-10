import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { EntityStorage } from '../../common/entity-storage';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  private readonly userStorage = new EntityStorage<User>();

  async create(dto: CreateUserDto): Promise<User> {
    const currentTimestamp = Date.now();
    const entityToCreate = new User({
      id: uuid(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });
    const [createdUser] = this.userStorage.set(entityToCreate);

    return createdUser;
  }

  async readAll(): Promise<User[]> {
    const users = this.userStorage.get();

    return users;
  }

  /**
   * @throws {NotFoundException}
   */
  async read(id: User['id']): Promise<User> {
    const [user] = this.userStorage.get(id);

    return user;
  }

  /**
   * @throws {NotFoundException}
   */
  async update(id: User['id'], dto: UpdateUserDto): Promise<User> {
    const [user, userIndex] = this.userStorage.get(id);
    const currentTimestamp = Date.now();
    const entityToUpdate = new User({
      id: user.id,
      login: user.login,
      password: dto.newPassword,
      version: (user.version += 1),
      createdAt: user.createdAt,
      updatedAt: currentTimestamp,
    });
    const [updatededUser] = this.userStorage.set(entityToUpdate, userIndex);

    return updatededUser;
  }

  /**
   * @throws {NotFoundException}
   */
  async delete(id: User['id']): Promise<User> {
    const [deletedUser] = this.userStorage.delete(id);

    return deletedUser;
  }
}
