import { unlink } from 'fs/promises';
import { join } from 'path';
import { FSError } from '../utility/fs-error.js';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

/**
 * @throws {FSError}
 */
export const remove = async (): Promise<void> => {
  try {
    const dirPath = join(getDirPath(import.meta.url), 'files');
    const filePath = join(dirPath, 'fileToRemove.txt');

    await unlink(filePath);
  } catch {
    throw new FSError();
  }
};

try {
  await remove();
} catch (reason) {
  handleError(reason);
}
