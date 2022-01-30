import camera from 'decs/Components/camera';
import calculateTransforms from 'decs/systems/calculateTransforms';
import inputHandler from 'decs/Utils/inputHandler';
import animate2D from 'decs/Systems/animate2D';
import resizeHandler from '../onDispose/resizeHandler';
import playerEntity from '../entities/playerEntity';
import movementSystem from '../systems/movementSystem';
import playerMovementSystem from '../systems/playerMovementSystem';
import mouseClickHandler from '../onDispose/mouseClickHandler';
import mouseMoveHandler from '../onDispose/mouseMoveHandler';
import shootSystem from '../systems/shootSystem';
import crosshairMovementSystem from '../systems/crosshairMovementSystem';
import crosshair from '../entities/crosshair';
import aggroSystem from '../systems/aggroSystem';
import tileMap from '../entities/tileMap';
import renderer2D from '../systems/renderer2D';
import headingPlayerSystem from '../systems/headingPlayerSystem';
import headingEnemySystem from '../systems/headingEnemySystem';
import cameraFollowSystem from '../systems/cameraFollowSystem';
import playerBulletCollisionSystem from '../systems/collisionSystems/playerBulletCollisionSystem';
import enemyBulletCollisionSystem from '../systems/collisionSystems/enemyBulletCollisionSystem';
import playerTileCollisionSystem from '../systems/collisionSystems/playerTileCollisionSystem';
import healthSystem from '../systems/healthSystem';
import timerSystem from '../systems/timerSystem';
import spawnSystem from '../systems/spawnSystem';
import mapToTile from '../utils/mapToTile';
import deathSystem from '../systems/deathSystem';
import saveScoreSystem from '../systems/storeScoreSystem';
import menuScene from './menuScene';
import enemyMovementSystem from '../systems/enemyMovementSystem';

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const generateMap = (width, height) => {
  const data = [];
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      data.push({ sprite: 'background.png', collision: false });
    }
  }
  for (let x = 0; x < width; x += 1) {
    data[x].collision = true;
    data[x].sprite = 'tiles1.png';
    data[x + (height - 2) * height].collision = true;
    data[x + (height - 1) * height].sprite = 'tiles2.png';
    data[x + (height - 2) * height].sprite = 'tiles9.png';
  }
  for (let y = 0; y < height; y += 1) {
    data[y * width].collision = true;
    data[y * width].sprite = 'tiles7.png';

    data[(width - 1) + y * height].collision = true;
    data[(width - 1) + y * height].sprite = 'tiles8.png';
  }
  data[0].sprite = 'tiles3.png';
  data[(width - 1) + (height - 1) * height].sprite = 'tiles5.png';
  data[(width - 1)].sprite = 'tiles4.png';
  data[(height - 1) * height].sprite = 'tiles6.png';

  return data;
};

export default (decs, canvas, gl) => {
  const scene = decs.createScene();

  tileMap(scene, mapToTile(0, 0, -3), {
    map: generateMap(TILE_WIDTH, TILE_WIDTH),
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  }, decs.resources.texture.getTexture('assets'), gl);

  const player = playerEntity(scene, mapToTile(16, 16, -2), [0, 0, 0], [48, 48, 1]);
  crosshair(scene, [0, 0, -1], [0, 0, 0], [12, 12, 1]);

  scene.update(0);

  scene.query(['position'], ({ position }, playerId) => {
    scene.addComponent(scene.createEntity(), {
      camera: camera(),
      position: [0, 0, 0],
      target: {
        entity: playerId,
        position,
      },
    });
  }, ['player']);
  const input = scene.createEntity();
  scene.addComponent(input, { input: {} });

  const timer = scene.createEntity();
  scene.addComponent(timer, { timeSinceStart: 0 });

  const score = scene.createEntity();
  scene.addComponent(score, { score: 0 });

  scene.update(0);
  scene.executeOnDispose(resizeHandler(scene, canvas, gl));

  scene.executeOnDispose(mouseClickHandler(scene, player, 'fire'));
  scene.executeOnDispose(mouseMoveHandler(scene, canvas));

  scene.addSystem(renderer2D);
  scene.addSystem(calculateTransforms);
  scene.addSystem(movementSystem);
  scene.addSystem(playerMovementSystem);

  scene.addSystem(playerTileCollisionSystem);
  scene.addSystem(cameraFollowSystem);
  scene.addSystem(crosshairMovementSystem);
  scene.addSystem(aggroSystem);
  scene.addSystem(headingPlayerSystem);
  scene.addSystem(headingEnemySystem);
  scene.addSystem(shootSystem);
  scene.addSystem(playerBulletCollisionSystem);
  scene.addSystem(enemyBulletCollisionSystem);
  scene.addSystem(animate2D);
  scene.addSystem(healthSystem);
  scene.addSystem(timerSystem);
  scene.addSystem(spawnSystem);
  scene.addSystem(deathSystem);
  scene.addSystem(saveScoreSystem);
  scene.addSystem(enemyMovementSystem);

  scene.addSystem(() => scene.query(['death'], () => {
    scene.resources.popScene();
    scene.resources.pushScene(menuScene(decs, canvas, gl));
  }, ['active', 'player']));

  scene.executeOnDispose(inputHandler(scene, input, {
    w: 'moveUp',
    a: 'moveLeft',
    s: 'moveDown',
    d: 'moveRight',
  }));

  return scene;
};
