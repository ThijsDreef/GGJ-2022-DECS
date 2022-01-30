import findHeading from '../utils/findHeading';
import getRandomNumber from '../utils/getRandomNumber';

const TRACKING_RANGE = 15;
const MOVEMENT_SPEED = 50;
export default (scene) => {
  scene.query(['acceleration'], ({ position: enemyPos, acceleration, target }) => {
    if (target) {
      const heading = findHeading(enemyPos, target.position);
      acceleration[0] = heading[0] * MOVEMENT_SPEED;
      acceleration[1] = heading[1] * MOVEMENT_SPEED;
    } else {
      scene.query(['position'], ({ position }) => {
        // calculate heading
        const randomPos = [...position];
        randomPos[0] += getRandomNumber(-TRACKING_RANGE, TRACKING_RANGE);
        randomPos[1] += getRandomNumber(-TRACKING_RANGE, TRACKING_RANGE);

        const heading = findHeading(randomPos, enemyPos);
        acceleration[0] = heading[0] * MOVEMENT_SPEED;
        acceleration[1] = heading[1] * MOVEMENT_SPEED;
      }, ['active', 'player']);
    }
  }, ['active', 'enemyMovement']);
};
