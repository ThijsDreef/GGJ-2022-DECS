import camera from 'decs/Components/camera';
import meshRenderer from 'decs/systems/meshRenderer';
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
import headingPlayerSystem from '../systems/headingPlayerSystem';
import headingEnemySystem from '../systems/headingEnemySystem';
import shootSystem from '../systems/shootSystem';
import playerBulletCollisionSystem from '../systems/collisionSystems/playerBulletCollisionSystem';
import enemyBulletCollisionSystem from '../systems/collisionSystems/enemyBulletCollisionSystem';

export default (decs, canvas, gl) => {
  const scene = decs.createScene();
  scene.addComponent(scene.createEntity(), {
    camera: camera(),
  });
  const input = scene.createEntity();
  scene.addComponent(input, { input: {} });

  scene.update(0);
  scene.executeOnDispose(resizeHandler(scene, canvas, gl));

  const player = playerEntity(scene, [0, 0, -1], [0, 0, 0], [16, 16, 1]);
  strawberry(scene, [64, 350, -1], [0, 0, 0], [16, 16, 1]);
  blueberry(scene, [300, 0, -1], [0, 0, 0], [16, 16, 1]);
  crosshair(scene, [0, 0, -1], [0, 0, 0], [16, 16, 1]);

  scene.executeOnDispose(mouseClickHandler(scene, player, 'fire'));
  scene.executeOnDispose(mouseMoveHandler(scene, canvas));
  scene.executeOnDispose(mouseClickHandler(scene, player));

  scene.addSystem(meshRenderer);
  scene.addSystem(calculateTransforms);
  scene.addSystem(movementSystem);
  scene.addSystem(playerMovementSystem);
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
