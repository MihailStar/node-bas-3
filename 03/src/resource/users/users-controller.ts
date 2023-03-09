import { HttpError } from '../../common/http-error.js';
import { HttpStatusCode } from '../../common/http-status-code.js';
import type {
  DefaultParams,
  Request,
  Response,
} from '../../simple-server/simple-server.js';
import type { User, UserDto } from './users-model.js';
import { UsersModel } from './users-model.js';

/**
 * @throws {HttpError}
 */
function validateUserDto(value: unknown): UserDto {
  if (!UsersModel.isDto(value)) {
    throw new HttpError('Request body is invalid', HttpStatusCode.BAD_REQUEST);
  }

  return value;
}

/**
 * @throws {HttpError}
 */
function validateUserId(value: unknown): User['id'] {
  if (!UsersModel.isId(value)) {
    throw new HttpError(
      'Request user id is invalid',
      HttpStatusCode.BAD_REQUEST
    );
  }

  return value;
}

export class UsersController {
  /**
   * @throws {HttpError}
   */
  static async create(
    this: void,
    req: Request<DefaultParams, UserDto>,
    res: Response
  ): Promise<void> {
    const validatedUserDto = validateUserDto(req.body);
    const newUser = await UsersModel.create(validatedUserDto);

    res.statusCode = HttpStatusCode.CREATED;
    res.sendObject({ data: newUser });
  }

  /**
   * @throws {HttpError}
   */
  static async read(
    this: void,
    req: Request<{ userId?: string }>,
    res: Response
  ): Promise<void> {
    if (req.params.userId === undefined) {
      const users = await UsersModel.read();

      res.statusCode = HttpStatusCode.OK;
      res.sendObject({ data: users });

      return;
    }

    const validatedUserId = validateUserId(req.params.userId);
    const user = await UsersModel.read(validatedUserId);

    if (user === null) {
      throw new HttpError('User not found', HttpStatusCode.NOT_FOUND);
    }

    res.statusCode = HttpStatusCode.OK;
    res.sendObject({ data: user });
  }

  /**
   * @throws {HttpError}
   */
  static async update(
    this: void,
    req: Request<{ userId: string }, UserDto>,
    res: Response
  ): Promise<void> {
    const validatedUserId = validateUserId(req.params.userId);
    const validatedUserDto = validateUserDto(req.body);
    const newUser = await UsersModel.update(validatedUserId, validatedUserDto);

    if (newUser === null) {
      throw new HttpError('User not found', HttpStatusCode.NOT_FOUND);
    }

    res.statusCode = HttpStatusCode.OK;
    res.sendObject({ data: newUser });
  }

  /**
   * @throws {HttpError}
   */
  static async delete(
    this: void,
    req: Request<{ userId: string }>,
    res: Response
  ): Promise<void> {
    const validatedUserId = validateUserId(req.params.userId);
    const user = await UsersModel.delete(validatedUserId);

    if (user === null) {
      throw new HttpError('User not found', HttpStatusCode.NOT_FOUND);
    }

    res.statusCode = HttpStatusCode.NO_CONTENT;
    /* res.sendObject({ data: user }); */
    res.end();
  }
}
