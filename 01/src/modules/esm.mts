import { createServer } from 'http';
import { createRequire } from 'module';
import { release, version } from 'os';
import { dirname, sep } from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line import/no-unresolved
import './files/c.js';

const random = Math.random();

const require = createRequire(import.meta.url);
const unknownObject: unknown =
  random > 0.5 ? require('./files/a.json') : require('./files/b.json');

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

/** `__filename` */
const filePath = fileURLToPath(import.meta.url);
/** `__dirname` */
const directoryPath = dirname(filePath);

console.log(`Path to current file is ${filePath}`);
console.log(`Path to current directory is ${directoryPath}`);

const myServer = createServer((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
