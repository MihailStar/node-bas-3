import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { getAbsolutePath } from '../utility/get-absolute-path.js';
import { AbstractExecutor } from './abstract-executor.js';

class HashExecutor extends AbstractExecutor {
  // eslint-disable-next-line class-methods-use-this
  protected async executor(filePath: string): Promise<void> {
    const inputFilePath = getAbsolutePath(filePath);
    const readStream = createReadStream(inputFilePath);
    const transformStream = createHash('sha256');

    await pipeline(readStream, transformStream);

    console.log(transformStream.digest('hex'));
  }
}

export { HashExecutor };
