import camera from 'decs/Components/camera';
import calculateTransforms from 'decs/systems/calculateTransforms';
import inputHandler from 'decs/Utils/inputHandler';
import resizeHandler from '../onDispose/resizeHandler';
import playerEntity from '../entities/playerEntity';
import strawberry from '../entities/strawberry';
import blueberry from '../entities/blueberry';
import movementSystem from '../systems/movementSystem';
import playerMovementSystem from '../systems/playerMovementSystem';
import mouseClickHandler from '../onDispose/mouseClickHandler';
import mouseMoveHandler from '../onDispose/mouseMoveHandler';
import crosshairMovementSystem from '../systems/crosshairMovementSystem';
import crosshair from '../entities/crosshair';
import aggroSystem from '../systems/aggroSystem';
import tileMap from '../entities/tileMap';
import renderer2D from '../systems/renderer2D';
import headingPlayerSystem from '../systems/headingPlayerSystem';
import headingEnemySystem from '../systems/headingEnemySystem';
import cameraFollowSystem from '../systems/cameraFollowSystem';
import shootSystem from '../systems/shootSystem';
import playerBulletCollisionSystem from '../systems/collisionSystems/playerBulletCollisionSystem';
import enemyBulletCollisionSystem from '../systems/collisionSystems/enemyBulletCollisionSystem';

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const mapToTile = (x, y, z) => [x * 32 + 16, y * 32 + 16, z];

const generateMap = (width, height) => {
  const data = [];
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      data.push({ sprite: 'background.png', collision: false });
    }
  }
  return data;
};

export default (decs, canvas, gl) => {
  const scene = decs.createScene();

  tileMap(scene, mapToTile(0, 0, -3), {
    map: generateMap(TILE_WIDTH, TILE_WIDTH),
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  }, decs.resources.texture.getTexture('assets'), gl);

  const player = playerEntity(scene, mapToTile(1, 1, -2), [0, 0, 0], [16, 16, 1]);
  strawberry(scene, mapToTile(28, 28, -2), [0, 0, 0], [16, 16, 1]);
  blueberry(scene, mapToTile(1, 4, -2), [0, 0, 0], [16, 16, 1]);
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

  scene.update(0);
  scene.executeOnDispose(resizeHandler(scene, canvas, gl));

  scene.executeOnDispose(mouseClickHandler(scene, player, 'fire'));
  scene.executeOnDispose(mouseMoveHandler(scene, canvas));
  scene.executeOnDispose(mouseClickHandler(scene, player));

  scene.addSystem(renderer2D);
  scene.addSystem(calculateTransforms);
  scene.addSystem(movementSystem);
  scene.addSystem(playerMovementSystem);
  scene.addSystem(cameraFollowSystem);
  scene.addSystem(crosshairMovementSystem);
  scene.addSystem(aggroSystem);
  scene.addSystem(headingPlayerSystem);
  scene.addSystem(headingEnemySystem);
  scene.addSystem(shootSystem);
  scene.addSystem(playerBulletCollisionSystem);
  scene.addSystem(enemyBulletCollisionSystem);

  scene.executeOnDispose(inputHandler(scene, input, {
    w: 'moveUp',
    a: 'moveLeft',
    s: 'moveDown',
    d: 'moveRight',
  }));

  return scene;
};
