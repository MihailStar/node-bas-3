import type { AbstractExecutor } from './executor/abstract-executor.js';
import { AddExecutor } from './executor/add-executor.js';
import { CatExecutor } from './executor/cat-executor.js';
import { CdExecutor } from './executor/cd-executor.js';
import { CompressExecutor } from './executor/compress-executor.js';
import { CpExecutor } from './executor/cp-executor.js';
import { DecompressExecutor } from './executor/decompress-executor.js';
import { HashExecutor } from './executor/hash-executor.js';
import { HelpExecutor } from './executor/help-executor.js';
import { LsExecutor } from './executor/ls-executor.js';
import { MvExecutor } from './executor/mv-executor.js';
import { OsExecutor } from './executor/os-executor.js';
import { RmExecutor } from './executor/rm-executor.js';
import { RnExecutor } from './executor/rn-executor.js';
import { UpExecutor } from './executor/up-executor.js';

const commandNameToExecutor: Record<string, AbstractExecutor> = {
  help: new HelpExecutor(),
  up: new UpExecutor(),
  cd: new CdExecutor(),
  ls: new LsExecutor(),
  cat: new CatExecutor(),
  add: new AddExecutor(),
  rn: new RnExecutor(),
  cp: new CpExecutor(),
  mv: new MvExecutor(),
  rm: new RmExecutor(),
  os: new OsExecutor(),
  hash: new HashExecutor(),
  compress: new CompressExecutor(),
  decompress: new DecompressExecutor(),
};

export { commandNameToExecutor };
