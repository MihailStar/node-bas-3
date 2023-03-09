import { left, mouse } from '@nut-tree/nut-js';
import type { Executor } from '../comand-to-executor.js';

const mouseLeft: Executor = async function executor(x) {
  await mouse.move(left(Number(x)));

  this.write(`mouse_left_${x}`);
};

export { mouseLeft };
