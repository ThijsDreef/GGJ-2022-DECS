import camera from 'decs/Components/camera';
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
import aggroSystem from '../systems/aggroSystem';
import tileMap from '../entities/tileMap';
import renderer2D from '../systems/renderer2D';

export default (decs, canvas, gl) => {
  const scene = decs.createScene();
  scene.addComponent(scene.createEntity(), {
    camera: camera(),
  });

  scene.update(0);
  scene.executeOnDispose(resizeHandler(scene, canvas, gl));

  const data = [
    [{ sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: true }],
    [{ sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: true }],
    [{ sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: true }],
    [{ sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: true }],
    [{ sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: true }],
    [{ sprite: 'background.png', collision: true }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: false }, { sprite: 'background.png', collision: true }],

  ];
  tileMap(scene, [0, 0, -3], data, decs.resources.texture.getTexture('assets'), gl);

  const player = playerEntity(scene, [0, 0, -2], [0, 0, 0], [16, 16, 1]);
  strawberry(scene, [64, 10, -2], [0, 0, 0], [16, 16, 1]);
  blueberry(scene, [-64, 0, -2], [0, 0, 0], [16, 16, 1]);
  crosshair(scene, [0, 0, -1], [0, 0, 0], [12, 12, 1]);

  scene.executeOnDispose(mouseMoveHandler(scene, canvas));
  scene.executeOnDispose(mouseClickHandler(scene, player));

  scene.addSystem(renderer2D);
  scene.addSystem(calculateTransforms);
  scene.addSystem(movementSystem);
  scene.addSystem(playerMovementSystem);
  scene.addSystem(crosshairMovementSystem);
  scene.addSystem(aggroSystem);

  scene.executeOnDispose(inputHandler(scene, player, {
    w: 'moveUp',
    a: 'moveLeft',
    s: 'moveDown',
    d: 'moveRight',
  }));

  return scene;
};
