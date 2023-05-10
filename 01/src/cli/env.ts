import { handleError } from '../utility/handle-error.js';

export const parseEnv = (): void => {
  const propPrefix = 'RSS_';
  const propValuePairs = Object.entries(process.env).filter(([prop]) =>
    prop.startsWith(propPrefix)
  );

  if (propValuePairs.length === 0) {
    return;
  }

  const formattedPropValuePairs = propValuePairs
    .map(([prop, value]) => `${prop}=${value ?? ''}`)
    .join('; ');

  console.log(formattedPropValuePairs);
};

try {
  parseEnv();
} catch (reason) {
  handleError(reason);
}
