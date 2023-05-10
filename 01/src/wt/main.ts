import { cpus } from 'os';
import { join } from 'path';
import { Worker } from 'worker_threads';
import { getDirPath } from '../utility/get-dir-path.js';
import { handleError } from '../utility/handle-error.js';

function createPromisedWorker(data: number): Promise<number> {
  const workerPath = join(getDirPath(import.meta.url), 'worker.js');
  const promisedWorker = new Promise<number>((resolve, reject) => {
    new Worker(workerPath, { workerData: data })
      .once('message', resolve)
      .once('error', reject);
  });

  return promisedWorker;
}

export const performCalculations = async (): Promise<void> => {
  const numberOfCpu = cpus().length;
  const initialNumber = 10;
  const promisedWorkers: Promise<number>[] = [];

  for (let index = 0; index < numberOfCpu; index += 1) {
    const promisedWorker = createPromisedWorker(initialNumber + index);

    promisedWorkers.push(promisedWorker);
  }

  const settledResults = await Promise.allSettled(promisedWorkers);
  const formattedResults = settledResults.map<
    { status: 'resolved'; data: number } | { status: 'error'; data: null }
  >((settledResult) => {
    if (settledResult.status === 'rejected') {
      return { status: 'error', data: null };
    }

    return { status: 'resolved', data: settledResult.value };
  });

  console.dir(formattedResults);
};

try {
  await performCalculations();
} catch (reason) {
  handleError(reason);
}
