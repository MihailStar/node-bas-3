import type { Response } from './simple-server.js';

/**
 * @throws {Error}
 */
export function sendObject<Obj extends object = Record<string, any>>(
  this: Response,
  object: Obj
): void {
  this.setHeader('Content-Type', 'application/json');

  let sentString: string;

  try {
    sentString = JSON.stringify(object);
  } catch {
    throw new Error('Sent object is invalid');
  }

  this.end(sentString);
}
