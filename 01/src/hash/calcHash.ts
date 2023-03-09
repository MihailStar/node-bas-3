import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

export const calculateHash = async (): Promise<void> => {
  const filePath = join(
    getDirPath(import.meta.url),
    'files',
    'fileToCalculateHashFor.txt'
  );
  const readStream = createReadStream(filePath);
  const transformStream = createHash('sha256');

  await pipeline(readStream, transformStream);

  console.log(transformStream.digest('hex'));
};

try {
  await calculateHash();
} catch (reason) {
  handleError(reason);
}
