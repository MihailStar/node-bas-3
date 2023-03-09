import { createReadStream } from 'fs';
import { EOL } from 'os';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

export const read = async (): Promise<void> => {
  const filePath = join(getDirPath(import.meta.url), 'files', 'fileToRead.txt');
  const readStream = createReadStream(filePath);
  const writeStream = process.stdout;

  readStream.once('end', () => writeStream.write(EOL));

  await pipeline(readStream, writeStream);
};

try {
  await read();
} catch (reason) {
  handleError(reason);
}
