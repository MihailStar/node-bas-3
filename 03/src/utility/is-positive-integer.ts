import { isInteger } from './is-integer.js';

export function isPositiveInteger(value: unknown): value is number {
  return isInteger(value) && value > 0;
}
