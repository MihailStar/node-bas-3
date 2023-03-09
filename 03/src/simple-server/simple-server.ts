import type { IncomingMessage, Server, ServerResponse } from 'http';
import { createServer } from 'http';
import { configuration } from '../common/configuration.js';
import { HttpError } from '../common/http-error.js';
import { HttpMethod } from '../common/http-method.js';
import type { StatusCode } from '../common/http-status-code.js';
import { HttpStatusCode } from '../common/http-status-code.js';
import { isKeyInObject } from '../utility/is-key-in-object.js';
import { parseJSONBody } from './parse-json-body.js';
import { Router } from './router.js';
import { sendObject } from './send-object.js';

export type DefaultParams = Partial<Record<string, string>>;
export type DefaultBody = Partial<Record<string, any>>;
export type Request<
  Params extends object = DefaultParams,
  Body extends object = DefaultBody
> = IncomingMessage & { params: Params; body: Body };
export type Response<Req extends Request = Request> = ServerResponse<Req> & {
  req: Req;
  sendObject: typeof sendObject;
};
export type Handler = (req: Request, res: Response) => Promise<void>;

export class SimpleServer {
  readonly server: Server;
  private readonly router: Router;

  constructor() {
    this.server = createServer((incomingMessage, serverResponse) => {
      void this.handleRequest(incomingMessage, serverResponse);
    });

    this.router = new Router();
  }

  post(pathOrPathWithMask: string, handler: Handler): this {
    this.router.setHandler('POST', pathOrPathWithMask, handler);

    return this;
  }

  get(pathOrPathWithMask: string, handler: Handler): this {
    this.router.setHandler('GET', pathOrPathWithMask, handler);

    return this;
  }

  put(pathOrPathWithMask: string, handler: Handler): this {
    this.router.setHandler('PUT', pathOrPathWithMask, handler);

    return this;
  }

  delete(pathOrPathWithMask: string, handler: Handler): this {
    this.router.setHandler('DELETE', pathOrPathWithMask, handler);

    return this;
  }

  register(router: { register: (this: SimpleServer) => void }): this {
    router.register.call(this);

    return this;
  }

  listen(port: number, callback?: () => void): this {
    this.server.listen(port, callback);

    return this;
  }

  close(): this {
    this.server.close();

    return this;
  }

  /**
   * @todo add `HttpError` throw if `Content-Type` is not `application/json`
   */
  private async handleRequest(
    incomingMessage: IncomingMessage,
    serverResponse: ServerResponse
  ): Promise<void> {
    const defaultParam: DefaultParams = {};
    const defaultBody: DefaultBody = {};
    const request = incomingMessage as Request;
    const response = serverResponse as Response;

    request.params = defaultParam;
    request.body = defaultBody;

    response.sendObject = sendObject;

    try {
      await parseJSONBody(request);

      const { method, url } = request;

      if (method === undefined) {
        throw new HttpError(
          'Request method required',
          HttpStatusCode.BAD_REQUEST
        );
      }

      if (!isKeyInObject(method, HttpMethod)) {
        throw new HttpError(
          'Request method is invalid',
          HttpStatusCode.BAD_REQUEST
        );
      }

      if (url === undefined) {
        throw new HttpError('Request url required', HttpStatusCode.BAD_REQUEST);
      }

      const handler = this.router.getHandler(method, url);

      if (handler === null) {
        throw new HttpError(
          `Resource, at '${method}:${url}', not found`,
          HttpStatusCode.NOT_FOUND
        );
      }

      await handler(request, response);
    } catch (reason) {
      let descriptionOfException: { reason: string; statusCode: StatusCode };

      if (reason instanceof HttpError) {
        descriptionOfException = {
          reason: reason.message,
          statusCode: reason.statusCode,
        };
      } else if (reason instanceof Error) {
        descriptionOfException = {
          reason: configuration.isDevelopment
            ? reason.message
            : 'Internal server error',
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        };
      } else {
        descriptionOfException = {
          reason: String(reason),
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        };
      }

      response.statusCode = descriptionOfException.statusCode;
      response.sendObject({ data: null, ...descriptionOfException });
    }
  }
}
