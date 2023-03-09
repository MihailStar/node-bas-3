import type { StatusCode } from './http-status-code.js';
import { HttpStatusCode } from './http-status-code.js';

export class HttpError extends Error {
  readonly statusCode: StatusCode;

  constructor(
    message: string,
    statusCode: StatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super();

    this.message = message;
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
