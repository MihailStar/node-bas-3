import { createReadStream } from 'fs';
import { EOL } from 'os';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { FSError } from '../utility/fs-error.js';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

/**
 * @throws {FSError}
 */
export const read = async (): Promise<void> => {
  try {
    const dirPath = join(getDirPath(import.meta.url), 'files');
    const readStream = createReadStream(join(dirPath, 'fileToRead.txt'));
    const writeStream = process.stdout;

    readStream.once('end', () => writeStream.write(EOL));

    await pipeline(readStream, writeStream);
  } catch {
    throw new FSError();
  }
};

try {
  await read();
} catch (reason) {
  handleError(reason);
}
