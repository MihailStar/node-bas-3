import { readdir } from 'fs/promises';
import { join } from 'path';
import { FSError } from '../utility/fs-error.js';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

const isTabularView = false;

/**
 * @throws {FSError}
 */
export const list = async (): Promise<void> => {
  try {
    const dirPath = join(getDirPath(import.meta.url), 'files');
    const names = (await readdir(dirPath, { withFileTypes: true })).map(
      (dirent) => (dirent.isDirectory() ? `${dirent.name}/` : dirent.name)
    );

    if (isTabularView) {
      console.table(names);
      return;
    }

    console.dir(names);
  } catch {
    throw new FSError();
  }
};

try {
  await list();
} catch (reason) {
  handleError(reason);
}
