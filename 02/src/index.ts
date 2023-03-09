import { homedir } from 'os';
import { createInterface } from 'readline';
import { handleInput } from './handle-input.js';
import { getСliOptions } from './utility/get-cli-options.js';

const username = getСliOptions()['username'] ?? 'Аnonymous';

process.chdir(homedir());

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${process.cwd()}`);

const io = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '< ',
})
  .on('line', (input) => {
    const trimedInput = input.trim();

    if (trimedInput === '.exit') {
      io.close();
      return;
    }

    handleInput(trimedInput).finally(() => {
      io.prompt();
    });
  })
  .on('SIGINT', () => {
    // for beauty
    console.log();
    io.close();
  })
  .on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });

io.prompt();
