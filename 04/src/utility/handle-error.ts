function handleError(reason: unknown): void {
  console.error(reason instanceof Error ? reason.message : reason);
}

export { handleError };
