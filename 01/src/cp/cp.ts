import { fork } from 'child_process';
import { once } from 'events';
import { join } from 'path';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

const spawnChildProcess = async (args: string[]): Promise<void> => {
  const childPath = join(getDirPath(import.meta.url), 'files', 'script.js');
  const childProcess = fork(childPath, args);

  childProcess.on('spawn', () => console.log('Child process born'));
  childProcess.on('close', () => console.log('Child process died'));

  await once(process, 'exit');
};

try {
  await spawnChildProcess(['someArg1', 'someArg2']);
} catch (reason) {
  handleError(reason);
}
