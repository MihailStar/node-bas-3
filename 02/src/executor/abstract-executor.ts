import { InputError } from '../error/input-error.js';

abstract class AbstractExecutor {
  validateArgs(...args: string[]): boolean {
    if (args.length === this.executor.length) {
      return true;
    }

    return false;
  }

  /**
   * @throws {InputError}
   */
  async execute(...args: string[]): Promise<void> {
    const isArgsValid = this.validateArgs(...args);

    if (!isArgsValid) {
      throw new InputError('Command argument');
    }

    await this.executor(...args);
  }

  protected abstract executor(...args: string[]): Promise<void>;
}

export { AbstractExecutor };
