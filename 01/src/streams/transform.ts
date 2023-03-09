import { EOL } from 'os';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { handleError } from '../utility/handle-error.js';
import { reverseString } from '../utility/reverse-string.js';

export const transform = async (): Promise<void> => {
  const readStream = process.stdin;
  const writeStream = process.stdout;
  const transformStream = new Transform({
    transform(chunk, _encoding, callback): void {
      try {
        const string = String(chunk).replace(EOL, '');
        const reversedString = reverseString(string);
        const data = `${reversedString}${EOL}`;

        callback(null, data);
      } catch (reason) {
        const error =
          reason instanceof Error ? reason : new Error(String(reason));

        callback(error);
      }
    },
  });

  await pipeline(readStream, transformStream, writeStream);
};

try {
  await transform();
} catch (reason) {
  handleError(reason);
}
