import { BOUNDS, X_DIFF, Y_DIFF } from '../WorkSpaceBounds';
import mapFromTile from './mapFromTile';

export function generateValidWorldSpacePosition() {
  const randomValidX = BOUNDS[0][0] + Math.random() * X_DIFF;
  const randomValidY = BOUNDS[0][1] + Math.random() * Y_DIFF;
  return [randomValidX, randomValidY];
}

const SAFE_DISTANCE = 10;
export function generateValidSafeWorldSpacePosition(rawPlayerPosition) {
  const playerPosition = mapFromTile(rawPlayerPosition[0], rawPlayerPosition[1], rawPlayerPosition[2]);

  while (true) {
    const validWorldPosition = generateValidWorldSpacePosition();
    const distanceX = validWorldPosition[0] - playerPosition[0];
    const distanceY = validWorldPosition[1] - playerPosition[1];
    const distance = Math.sqrt((distanceX ** 2) + (distanceY ** 2));

    if (distance > SAFE_DISTANCE) return validWorldPosition;
  }
}
