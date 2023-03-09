const optionPrefix = '--';
const optionSeparator = '=';
const optionRegExp = new RegExp(`^${optionPrefix}.+${optionSeparator}.+$`);

/**
 * for `--key=value` options
 */
function getСliOptions(): Partial<Record<string, string>> {
  const { argv: cliArgs } = process;
  const options: Record<string, string> = {};

  for (let index = 2; index < cliArgs.length; index += 1) {
    const optionСandidate = cliArgs[index];

    if (optionRegExp.test(optionСandidate)) {
      const [key, value] = optionСandidate.split(optionSeparator);

      options[key.slice(optionPrefix.length)] = value;
    }
  }

  return options;
}

export { getСliOptions };
