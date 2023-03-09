const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk: Buffer): void => {
  const chunkStringified = chunk.toString();
  // eslint-disable-next-line n/no-process-exit
  if (chunkStringified.includes('CLOSE')) process.exit(0);
  process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
};

process.stdin.on('data', echoInput);
