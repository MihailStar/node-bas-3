import { Button, mouse, Point } from '@nut-tree/nut-js';
import { getPointOnCircle } from '../../utility/get-point-on-circle.js';
import type { Executor } from '../comand-to-executor.js';

/**
 * @tutorial - https://www.youtube.com/watch?v=YXA3MTnYDI8
 */
const drawCircle: Executor = async function executor(r) {
  const mouseCoordinate = await mouse.getPosition();
  const radius = Number(r);
  const center = getPointOnCircle(mouseCoordinate, radius, 45);
  const pointsOnCircle: Point[] = [];

  for (let degrees = 0; degrees < 360; degrees += 1) {
    const pointOnCircle = getPointOnCircle(center, radius, degrees);

    pointsOnCircle.push(pointOnCircle);
  }

  const offsetInDegrees = 45 + 90;
  const offsetPointsOnCircle = pointsOnCircle
    .slice(pointsOnCircle.length - offsetInDegrees, pointsOnCircle.length)
    .concat(pointsOnCircle.slice(0, pointsOnCircle.length - offsetInDegrees));

  await mouse.pressButton(Button.LEFT);
  await mouse.move(offsetPointsOnCircle);
  await mouse.releaseButton(Button.LEFT);

  this.write(`draw_circle_${r}`);
};

export { drawCircle };
