import type { Writable } from 'stream';
import { isKeyInObject } from '../utility/is-key-in-object.js';
import { drawCircle } from './executor/draw-circle.js';
import { drawRectangle } from './executor/draw-rectangle.js';
import { drawSquare } from './executor/draw-square.js';
import { mouseDown } from './executor/mouse-down.js';
import { mouseLeft } from './executor/mouse-left.js';
import { mousePosition } from './executor/mouse-position.js';
import { mouseRight } from './executor/mouse-right.js';
import { mouseUp } from './executor/mouse-up.js';
import { prntScrn } from './executor/prnt-scrn.js';

export type Comand =
  | 'draw_circle'
  | 'draw_rectangle'
  | 'draw_square'
  | 'mouse_down'
  | 'mouse_left'
  | 'mouse_position'
  | 'mouse_right'
  | 'mouse_up'
  | 'prnt_scrn';
export type Executor = (this: Writable, ...args: string[]) => Promise<void>;

const comandToExecutor: Record<Comand, Executor> = {
  mouse_up: mouseUp,
  mouse_down: mouseDown,
  mouse_left: mouseLeft,
  mouse_right: mouseRight,
  mouse_position: mousePosition,

  draw_circle: drawCircle,
  draw_rectangle: drawRectangle,
  draw_square: drawSquare,

  prnt_scrn: prntScrn,
} as const;

function isComand(possibleComand: string): possibleComand is Comand {
  return isKeyInObject(possibleComand, comandToExecutor);
}

export { comandToExecutor, isComand };
