function isError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error;
}

export { isError };
