import { isPositiveInteger } from './is-positive-integer.js';

export function isPositiveIntegerArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isPositiveInteger);
}
