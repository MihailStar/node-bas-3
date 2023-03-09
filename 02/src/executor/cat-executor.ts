import { once } from 'events';
import { createReadStream } from 'fs';
import { EOL } from 'os';
import { getAbsolutePath } from '../utility/get-absolute-path.js';
import { AbstractExecutor } from './abstract-executor.js';

class CatExecutor extends AbstractExecutor {
  // eslint-disable-next-line class-methods-use-this
  protected async executor(filePath: string): Promise<void> {
    const inputFilePath = getAbsolutePath(filePath);
    const readStream = createReadStream(inputFilePath);
    const writeStream = process.stdout;

    readStream
      .on('end', () => {
        writeStream.write(EOL);
      })
      .on('data', (chunk) => {
        writeStream.write(chunk);
      });

    await once(readStream, 'close');
  }
}

export { CatExecutor };
