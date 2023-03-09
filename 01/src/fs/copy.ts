import { copyFile, mkdir, readdir } from 'fs/promises';
import { join } from 'path';
import { FSError } from '../utility/fs-error.js';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

/**
 * @param inputDirPath absolute
 * @param outputDirPath absolute
 */
async function copyDir(
  inputDirPath: string,
  outputDirPath: string
): Promise<void> {
  const dirents = await readdir(inputDirPath, { withFileTypes: true });
  const promises: Promise<void>[] = [];

  // after `readdir`
  await mkdir(outputDirPath);

  dirents.forEach((dirent) => {
    if (dirent.isDirectory()) {
      const nestedInputDirPath = join(inputDirPath, dirent.name);
      const nestedOutputDirPath = join(outputDirPath, dirent.name);

      promises.push(copyDir(nestedInputDirPath, nestedOutputDirPath));
      return;
    }

    const inputFilePath = join(inputDirPath, dirent.name);
    const outputFilePath = join(outputDirPath, dirent.name);

    promises.push(copyFile(inputFilePath, outputFilePath));
  });

  await Promise.all(promises);
}

/**
 * @throws {FSError}
 */
export const copy = async (): Promise<void> => {
  try {
    const dirPath = getDirPath(import.meta.url);
    const inputDirPath = join(dirPath, 'files');
    const outputDirPath = join(dirPath, 'files_copy');

    await copyDir(inputDirPath, outputDirPath);
  } catch {
    throw new FSError();
  }
};

try {
  await copy();
} catch (reason) {
  handleError(reason);
}
