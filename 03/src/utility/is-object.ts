export function isObject<Obj extends object = Record<keyof any, any>>(
  value: unknown
): value is Obj {
  return typeof value === 'object' && value !== null;
}
