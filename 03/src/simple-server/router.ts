import type { Method } from '../common/http-method.js';
import type { Handler, Request, Response } from './simple-server.js';

/**
 * @example
 * ```
 * createPathRegexp('/api/users/{userId}/?'); // -> /^\/api\/users\/(?<userId>[^/]+)\/?$/
 * ```
 */
function createPathRegexp(pathWithMask: string): RegExp {
  const pattern = pathWithMask.replaceAll(
    /\{(.+?)\}/g,
    (_match, group: string) => `(?<${group}>[^/]+)`
  );

  return new RegExp(`^${pattern}$`);
}

export class Router {
  private readonly pairsOfPathWithMaskAndPathRegexp: [string, RegExp][] = [];
  private readonly pathWithMaskToMethodToHandlers: Map<
    string,
    Map<Method, Handler[]>
  > = new Map();

  setHandler(method: Method, pathWithMask: string, handler: Handler): void {
    const methodToHandlers =
      this.pathWithMaskToMethodToHandlers.get(pathWithMask);

    if (methodToHandlers === undefined) {
      const pathRegexp = createPathRegexp(pathWithMask);
      const newMethodToHandlers = new Map([[method, [handler]]]);

      this.pairsOfPathWithMaskAndPathRegexp.push([pathWithMask, pathRegexp]);
      this.pathWithMaskToMethodToHandlers.set(
        pathWithMask,
        newMethodToHandlers
      );

      return;
    }

    const handlers = methodToHandlers.get(method);

    if (handlers === undefined) {
      methodToHandlers.set(method, [handler]);

      return;
    }

    methodToHandlers.set(method, [...handlers, handler]);
  }

  getHandler(method: Method, path: string): Handler | null {
    for (
      let index = 0;
      index < this.pairsOfPathWithMaskAndPathRegexp.length;
      index += 1
    ) {
      const [pathWithMask, pathRegexp] =
        this.pairsOfPathWithMaskAndPathRegexp[index];
      const pathMatch = path.match(pathRegexp);

      if (pathMatch === null) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const methodToHandlers =
        this.pathWithMaskToMethodToHandlers.get(pathWithMask)!;
      const handlers = methodToHandlers.get(method);

      if (handlers === undefined) {
        return null;
      }

      return async (req: Request, res: Response): Promise<void> => {
        if (pathMatch.groups !== undefined) {
          req.params = { ...req.params, ...pathMatch.groups };
        }

        const promises: Promise<void>[] = [];

        handlers.forEach((handler) => {
          promises.push(handler(req, res));
        });

        await Promise.all(promises);
      };
    }

    return null;
  }
}
