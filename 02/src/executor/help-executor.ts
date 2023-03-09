import { AbstractExecutor } from './abstract-executor.js';

const commandList = `
help

up
cd <directory_path>
ls

cat <file_path>
add <file_path>
rn <file_path> <file_path>
cp <file_path> <directory_path>
mv <file_path> <directory_path>
rm <file_path>

os --EOL
os --cpus
os --homedir
os --username
os --architecture

hash <file_path>

compress <file_path> <file_path>
decompress <file_path> <file_path>

.exit
`;

class HelpExecutor extends AbstractExecutor {
  // eslint-disable-next-line class-methods-use-this
  protected async executor(): Promise<void> {
    console.log(commandList.trim());
  }
}

export { HelpExecutor };
