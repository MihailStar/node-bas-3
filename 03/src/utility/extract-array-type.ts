export type ExtractArrayType<Arr> = Arr extends
  | Array<infer Type>
  | ReadonlyArray<infer Type>
  ? Type
  : never;
