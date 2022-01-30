import blueberry from '../entities/blueberry';
import strawberry from '../entities/strawberry';
import { generateValidSafeWorldSpacePosition } from '../utils/generateValidWorldSpacePosition';
import mapToTile from '../utils/mapToTile';

const MIN_ENEMIES = 3;
const TIME_TILL_DIFFICULTY_INCREASE = 10;

const enemiesToSpawn = [strawberry, blueberry];

export default (scene) => {
  let enemyCount = 0;
  scene.query(['enemy'], () => {
    enemyCount += 1;
  }, ['active']);

  // Exit early if the number of enemies already equals to or passes the bare minimum threshold.
  if (enemyCount >= MIN_ENEMIES) return;

  scene.query(['position'], ({ position }) => {
    scene.query(['timeSinceStart'], ({ timeSinceStart }) => {
      const additionalEnemies = Math.floor(timeSinceStart / TIME_TILL_DIFFICULTY_INCREASE);
      const totalMinEnemies = MIN_ENEMIES + additionalEnemies;
      const numberOfEnemiesToSpawn = totalMinEnemies - enemyCount;
      for (let i = 0; i < numberOfEnemiesToSpawn; i += 1) {
        enemiesToSpawn[
          Math.floor(Math.random() * enemiesToSpawn.length)
        ](
          scene,
          mapToTile(...generateValidSafeWorldSpacePosition(position), -1),
          [0, 0, 0],
          [20, 20, 1],
        );
      }
    });
  }, ['player']);
};
