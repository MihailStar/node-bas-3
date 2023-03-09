import { mouse, right } from '@nut-tree/nut-js';
import type { Executor } from '../comand-to-executor.js';

const mouseRight: Executor = async function executor(x) {
  await mouse.move(right(Number(x)));

  this.write(`mouse_right_${x}`);
};

export { mouseRight };
