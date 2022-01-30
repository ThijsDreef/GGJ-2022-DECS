import blueberry from '../entities/blueberry';
import strawberry from '../entities/strawberry';
import generateValidWorldSpacePosition from '../utils/generateValidWorldSpacePosition';
import mapToTile from '../utils/mapToTile';

const MIN_ENEMIES = 3;
const TIME_TILL_DIFFICULTY_INCREASE = 10;

const enemiesToSpawn = [strawberry, blueberry];

export default (scene) => {
  let enemyCount = 0;
  scene.query(['enemy'], () => {
    enemyCount += 1;
  }, ['active']);

  scene.query(['timeSinceStart'], ({ timeSinceStart }) => {
    const additionalEnemies = Math.floor(timeSinceStart / TIME_TILL_DIFFICULTY_INCREASE);
    const totalMinEnemies = MIN_ENEMIES + additionalEnemies;
    const numberOfEnemiesToSpawn = totalMinEnemies - enemyCount;
    for (let i = 0; i < numberOfEnemiesToSpawn; i += 1) {
      enemiesToSpawn[
        Math.floor(Math.random() * enemiesToSpawn.length)
      ](
        scene,
        mapToTile(...generateValidWorldSpacePosition(), -1),
        [0, 0, 0],
        [16, 16, 1],
      );
    }
  });
};
