import { writeFile } from 'fs/promises';
import { join } from 'path';
import { FSError } from '../utility/fs-error.js';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

/**
 * @throws {FSError}
 */
export const create = async (): Promise<void> => {
  try {
    const filePath = join(getDirPath(import.meta.url), 'files', 'fresh.txt');
    const fileText = 'I am fresh and young';

    await writeFile(filePath, fileText, { flag: 'wx' });
  } catch {
    throw new FSError();
  }
};

try {
  await create();
} catch (reason) {
  handleError(reason);
}
