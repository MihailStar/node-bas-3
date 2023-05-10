import type { Executor } from '../comand-to-executor.js';
import { drawRectangle } from './draw-rectangle.js';

const drawSquare: Executor = async function executor(s) {
  await drawRectangle.call(this, s, s);
};

export { drawSquare };
