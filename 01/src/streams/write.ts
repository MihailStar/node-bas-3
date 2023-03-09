import { createWriteStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

const isAppendingFile = false;

export const write = async (): Promise<void> => {
  const filePath = join(
    getDirPath(import.meta.url),
    'files',
    'fileToWrite.txt'
  );
  const readStream = process.stdin;
  const writeStream = createWriteStream(filePath, {
    flags: isAppendingFile ? 'a' : 'w',
  });

  await pipeline(readStream, writeStream);
};

try {
  await write();
} catch (reason) {
  handleError(reason);
}
