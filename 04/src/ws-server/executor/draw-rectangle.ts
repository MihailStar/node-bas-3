import { Button, down, left, mouse, right, up } from '@nut-tree/nut-js';
import type { Executor } from '../comand-to-executor.js';

const drawRectangle: Executor = async function executor(w, h) {
  const width = Number(w);
  const height = Number(h);

  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));
  await mouse.move(down(height));
  await mouse.move(left(width));
  await mouse.move(up(height));
  await mouse.releaseButton(Button.LEFT);

  this.write(`draw_rectangle_${w}_${h}`);
};

export { drawRectangle };
