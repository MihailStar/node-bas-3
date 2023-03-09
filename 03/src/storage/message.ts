import { isObject } from '../utility/is-object.js';
import { isString } from '../utility/is-string.js';

// constructor name cannot used as kind
// constructor name truncated when build bundle
const KIND = 'Message';

export class Message<T> {
  readonly kind: string;
  readonly key: string;
  readonly data: T[] | null;

  constructor(key: string, data: T[] | null = null) {
    this.kind = KIND;
    this.key = key;
    this.data = data;
  }

  static isMessage<T>(value: unknown): value is Message<T> {
    return (
      isObject(value) &&
      value['kind'] === KIND &&
      isString(value['key']) &&
      // `object` type and `null` type are valid
      typeof value['data'] === 'object'
    );
  }
}
