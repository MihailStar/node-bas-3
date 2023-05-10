import { down, mouse } from '@nut-tree/nut-js';
import type { Executor } from '../comand-to-executor.js';

const mouseDown: Executor = async function executor(y) {
  await mouse.move(down(Number(y)));

  this.write(`mouse_down_${y}`);
};

export { mouseDown };
