import { Point } from '@nut-tree/nut-js';
import { degreesToRadians } from './degrees-to-radians.js';

function getPointOnCircle(
  center: Point,
  radius: number,
  angleInDegrees: number
): Point {
  const angleInRadians = degreesToRadians(angleInDegrees);
  const xСoordinate = center.x + Math.round(radius * Math.cos(angleInRadians));
  const yСoordinate = center.y + Math.round(radius * Math.sin(angleInRadians));
  const point = new Point(xСoordinate, yСoordinate);

  return point;
}

export { getPointOnCircle };
