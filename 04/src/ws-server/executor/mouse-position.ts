import { mouse } from '@nut-tree/nut-js';
import type { Executor } from '../comand-to-executor.js';

const mousePosition: Executor = async function executor() {
  const mouseCoordinate = await mouse.getPosition();

  this.write(
    `mouse_position ${String(mouseCoordinate.x)},${String(mouseCoordinate.y)}`
  );
};

export { mousePosition };
