import { isPositiveString } from './is-positive-string.js';

export function isPositiveStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isPositiveString);
}
