import { rename } from 'fs/promises';
import { OperationError } from '../error/operation-error.js';
import { getAbsolutePath } from '../utility/get-absolute-path.js';
import { isExist } from '../utility/is-exist.js';
import { AbstractExecutor } from './abstract-executor.js';

/**
 * @throws {OperationError}
 */
class RnExecutor extends AbstractExecutor {
  // eslint-disable-next-line class-methods-use-this
  protected async executor(
    filePath: string,
    newFilePath: string
  ): Promise<void> {
    const inputFilePath = getAbsolutePath(filePath);
    const outputFilePath = getAbsolutePath(newFilePath);

    // rewrite to `isExistSync`
    if (await isExist(outputFilePath)) {
      throw new OperationError('Code EEXIST');
    }

    await rename(inputFilePath, outputFilePath);
  }
}

export { RnExecutor };
