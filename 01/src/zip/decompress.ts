import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { createUnzip } from 'zlib';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

const isDeletingArchive = false;

export const decompress = async (): Promise<void> => {
  const dirPath = join(getDirPath(import.meta.url), 'files');
  const inputFilePath = join(dirPath, 'archive.gz');
  const outputFilePath = join(dirPath, 'fileToCompress.txt');

  const readStream = createReadStream(inputFilePath);
  /** transform stream */
  const unzip = createUnzip();
  const writeStream = createWriteStream(outputFilePath);

  await pipeline(readStream, unzip, writeStream);

  if (isDeletingArchive) {
    await unlink(inputFilePath);
  }
};

try {
  await decompress();
} catch (reason) {
  handleError(reason);
}
