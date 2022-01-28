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
import mouseClickHandler from '../systems/mouseClickHandler';
import mouseMoveHandler from '../systems/mouseMoveHandler';
import crosshairMovementSystem from '../systems/crosshairMovementSystem';
import crosshair from '../entities/crosshair';

export default (decs, canvas, gl) => {
  const scene = decs.createScene();
  scene.addComponent(scene.createEntity(), {
    camera: camera(),
  });

  scene.update(0);
  scene.executeOnDispose(resizeHandler(scene, canvas, gl));

  const player = playerEntity(scene, [0, 0, -1], [0, 0, 0], [16, 16, 1]);
  strawberry(scene, [64, 0, -1], [0, 0, 0], [16, 16, 1]);
  blueberry(scene, [-64, 0, -1], [0, 0, 0], [16, 16, 1]);
  crosshair(scene, [0, 0, -1], [0, 0, 0], [16, 16, 1]);

  scene.executeOnDispose(mouseMoveHandler(scene, canvas));
  scene.executeOnDispose(mouseClickHandler(scene, player));

  scene.addSystem(meshRenderer);
  scene.addSystem(calculateTransforms);
  scene.addSystem(movementSystem);
  scene.addSystem(playerMovementSystem);
  scene.addSystem(crosshairMovementSystem);

  scene.executeOnDispose(inputHandler(scene, player, {
    w: 'moveUp',
    a: 'moveLeft',
    s: 'moveDown',
    d: 'moveRight',
  }));

  return scene;
};
