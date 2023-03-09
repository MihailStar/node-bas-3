export function isKeyInObject<Obj extends object>(
  key: keyof any,
  object: Obj
): key is keyof Obj {
  return key in object;
}
