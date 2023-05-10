import { parentPort, workerData } from 'worker_threads';
import { isInteger } from '../utility/is-integer.js';

/**
 * @param number integer
 */
const nthFibonacci = (number: number): number =>
  number < 2 ? number : nthFibonacci(number - 1) + nthFibonacci(number - 2);

/**
 * @throws {Error|RangeError}
 */
const sendResult = (): void => {
  if (!(parentPort instanceof MessagePort)) {
    throw new Error('`parentPort` not found');
  }

  if (!isInteger(workerData)) {
    throw new RangeError('`workerData` is not integer');
  }

  parentPort.postMessage(nthFibonacci(workerData));
};

sendResult();
