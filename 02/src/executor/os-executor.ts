import { arch, cpus, EOL, homedir, userInfo } from 'os';
import { isFunction } from '../utility/is-function.js';
import { AbstractExecutor } from './abstract-executor.js';

function getEOL(): void {
  console.log(JSON.stringify(EOL).slice(1, -1));
}

function getCpus(): void {
  const cores = cpus();

  console.log(`${cores.length} logical CPU cores`);

  console.table(
    cores.map(({ model, speed: speedInMHz }) => ({
      model,
      speed: `${speedInMHz / 1000} GHz`,
    }))
  );
}

function getHomedir(): void {
  console.log(homedir());
}

function getUsername(): void {
  try {
    console.log(userInfo().username);
  } catch {
    console.log('Unknown');
  }
}

function getArchitecture(): void {
  console.log(arch());
}

const optionToFunction: Record<string, () => void> = {
  '--EOL': getEOL,
  '--cpus': getCpus,
  '--homedir': getHomedir,
  '--username': getUsername,
  '--architecture': getArchitecture,
};

class OsExecutor extends AbstractExecutor {
  override validateArgs(...args: string[]): boolean {
    if (
      super.validateArgs(...args) &&
      args.every((arg) => isFunction(optionToFunction[arg]))
    ) {
      return true;
    }

    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  protected async executor(option: string): Promise<void> {
    optionToFunction[option]();
  }
}

export { OsExecutor };
