import { isString } from './is-string.js';

export function isPositiveString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}
