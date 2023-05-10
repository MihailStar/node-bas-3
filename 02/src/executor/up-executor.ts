import { posix } from 'path';
import { AbstractExecutor } from './abstract-executor.js';

class UpExecutor extends AbstractExecutor {
  // eslint-disable-next-line class-methods-use-this
  protected async executor(): Promise<void> {
    // Windows works with both slashes
    const { sep: slash } = posix;

    process.chdir(`.${slash}..`);
  }
}

export { UpExecutor };
