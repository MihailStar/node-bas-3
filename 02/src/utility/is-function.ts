function isFunction(func: unknown): func is (...args: any[]) => any {
  return typeof func === 'function';
}

export { isFunction };
