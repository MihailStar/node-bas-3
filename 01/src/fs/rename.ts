import { rename as fsRename } from 'fs/promises';
import { join } from 'path';
import { FSError } from '../utility/fs-error.js';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';
import { isFileExist } from '../utility/is-file-exist.js';

/**
 * @throws {FSError}
 */
export const rename = async (): Promise<void> => {
  try {
    const dirPath = join(getDirPath(import.meta.url), 'files');
    const oldFilePath = join(dirPath, 'wrongFilename.txt');
    const newFilePath = join(dirPath, 'properFilename.md');

    if (await isFileExist(newFilePath)) {
      throw new FSError('File already exists');
    }

    await fsRename(oldFilePath, newFilePath);
  } catch {
    throw new FSError();
  }
};

try {
  await rename();
} catch (reason) {
  handleError(reason);
}
