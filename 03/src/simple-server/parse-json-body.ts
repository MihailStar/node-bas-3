import { HttpError } from '../common/http-error.js';
import { HttpStatusCode } from '../common/http-status-code.js';
import { isObject } from '../utility/is-object.js';
import type { DefaultBody, Request } from './simple-server.js';

export function parseJSONBody(req: Request): Promise<void> {
  if (req.headers['content-type'] !== 'application/json') {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    let body = '';

    req
      .on('error', (error) => {
        reject(error);
      })
      .on('end', () => {
        let parsedBody: DefaultBody;

        try {
          parsedBody = JSON.parse(body) as DefaultBody;
        } catch {
          return reject(
            new HttpError('Request body is invalid', HttpStatusCode.BAD_REQUEST)
          );
        }

        if (!isObject(parsedBody)) {
          return reject(
            new HttpError(
              'Request body must be an object',
              HttpStatusCode.BAD_REQUEST
            )
          );
        }

        req.body = { ...req.body, ...parsedBody };

        return resolve();
      })
      .on('data', (chunk) => {
        body += chunk;
      });
  });
}
