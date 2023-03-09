export const HttpMethod = {
  CONNECT: 'CONNECT',
  DELETE: 'DELETE',
  GET: 'GET',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  TRACE: 'TRACE',
} as const;

export type Method = typeof HttpMethod[keyof typeof HttpMethod];
