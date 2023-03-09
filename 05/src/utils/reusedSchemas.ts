export const idParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
  },
} as const;

export const uuidParamSchema = {
  ...idParamSchema,
  properties: {
    id: { type: 'string', format: 'uuid' },
  },
} as const;

export const memberTypeIdParamSchema = {
  ...idParamSchema,
  properties: {
    id: { type: 'string', pattern: '^(basic|business)$' },
  },
} as const;
