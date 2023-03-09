import { mouse, up } from '@nut-tree/nut-js';
import type { Executor } from '../comand-to-executor.js';

const mouseUp: Executor = async function executor(y) {
  await mouse.move(up(Number(y)));

  this.write(`mouse_up_${y}`);
};

export { mouseUp };
