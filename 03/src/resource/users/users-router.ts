import type {
  DefaultParams,
  Request,
  SimpleServer,
} from '../../simple-server/simple-server.js';
import { UsersController } from './users-controller.js';
import type { UserDto } from './users-model.js';

export class UsersRouter {
  static register(this: SimpleServer): void {
    let path = '';

    path = '/api/users/{userId}/?';
    this.get(path, (req, res) =>
      UsersController.read(req as Request<{ userId: string }>, res)
    );
    this.put(path, (req, res) =>
      UsersController.update(req as Request<{ userId: string }, UserDto>, res)
    );
    this.delete(path, (req, res) =>
      UsersController.delete(req as Request<{ userId: string }>, res)
    );

    path = '/api/users/?';
    this.post(path, async (req, res) =>
      UsersController.create(req as Request<DefaultParams, UserDto>, res)
    );
    this.get(path, (req, res) => UsersController.read(req, res));
  }
}
