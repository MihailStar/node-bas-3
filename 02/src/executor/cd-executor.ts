import { getEndingSlashPath } from '../utility/get-ending-slash-path.js';
import { AbstractExecutor } from './abstract-executor.js';

class CdExecutor extends AbstractExecutor {
  // eslint-disable-next-line class-methods-use-this
  protected async executor(dirPath: string): Promise<void> {
    // for `cd d:`
    const dirPathWithEndingSlash = getEndingSlashPath(dirPath);

    process.chdir(dirPathWithEndingSlash);
  }
}

export { CdExecutor };
