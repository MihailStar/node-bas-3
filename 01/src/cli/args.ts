import { handleError } from '../utility/handle-error.js';

/**
 * @throws {RangeError}
 */
export const parseArgs = (): void => {
  const propPrefix = '--';
  const errorMessage = `${propPrefix}prop1 value1 ... ${propPrefix}propN valueN`;

  const keyValuePairs: [string, string][] = [];

  for (let index = 2; index < process.argv.length; index += 2) {
    const prop = process.argv[index]!;
    const value = process.argv[index + 1];

    if (!prop.startsWith(propPrefix) || value === undefined) {
      throw new RangeError(errorMessage);
    }

    keyValuePairs.push([prop.slice(propPrefix.length), value]);
  }

  if (keyValuePairs.length === 0) {
    throw new RangeError(errorMessage);
  }

  const formattedKeyValuePairs = keyValuePairs
    .map(([key, value]) => `${key} is ${value}`)
    .join(', ');

  console.log(formattedKeyValuePairs);
};

try {
  parseArgs();
} catch (reason) {
  handleError(reason);
}
