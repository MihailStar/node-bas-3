import { createWriteStream } from 'fs';
import { open } from 'fs/promises';
import { basename, join } from 'path';
import { pipeline } from 'stream/promises';
import { getAbsolutePath } from '../utility/get-absolute-path.js';
import { getEndingSlashPath } from '../utility/get-ending-slash-path.js';
import { AbstractExecutor } from './abstract-executor.js';

class CpExecutor extends AbstractExecutor {
  // eslint-disable-next-line class-methods-use-this
  protected async executor(filePath: string, dirPath: string): Promise<void> {
    const inputFileName = basename(filePath);
    const inputFilePath = getAbsolutePath(filePath);
    // for `cp <file_path> d:`
    const dirPathWithEndingSlash = getEndingSlashPath(dirPath);
    const outputDirPath = getAbsolutePath(dirPathWithEndingSlash);
    const outputFilePath = join(outputDirPath, inputFileName);

    const readStream = (await open(inputFilePath)).createReadStream();
    const writeStream = createWriteStream(outputFilePath, { flags: 'wx' });

    await pipeline(readStream, writeStream);
  }
}

export { CpExecutor };
