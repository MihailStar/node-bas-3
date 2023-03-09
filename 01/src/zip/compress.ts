import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

const isDeletingFile = false;

export const compress = async (): Promise<void> => {
  const dirPath = join(getDirPath(import.meta.url), 'files');
  const inputFilePath = join(dirPath, 'fileToCompress.txt');
  const outputFilePath = join(dirPath, 'archive.gz');

  const readStream = createReadStream(inputFilePath);
  /** transform stream */
  const gzip = createGzip();
  const writeStream = createWriteStream(outputFilePath);

  await pipeline(readStream, gzip, writeStream);

  if (isDeletingFile) {
    await unlink(inputFilePath);
  }
};

try {
  await compress();
} catch (reason) {
  handleError(reason);
}
