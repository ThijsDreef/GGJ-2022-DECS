import camera from 'decs/Components/camera';
import calculateTransforms from 'decs/systems/calculateTransforms';
import animate2D from 'decs/Systems/animate2D';

import crosshair from '../entities/crosshair';
import defaultEntity from '../entities/defaultEntity';
import playerEntity from '../entities/playerEntity';
import mouseMoveHandler from '../onDispose/mouseMoveHandler';
import resizeHandler from '../onDispose/resizeHandler';
import crosshairMovementSystem from '../systems/crosshairMovementSystem';
import renderer2D from '../systems/renderer2D';
import blueberry from '../entities/blueberry';
import strawberry from '../entities/strawberry';
import mouseClickHandler from '../onDispose/mouseClickHandler';
import gameScene from './gameScene';
import textEntity from '../entities/textEntity';

const generateText = (scene, gl, text, position, scale) => {

};

export default (decs, canvas, gl) => {
  const scene = decs.createScene();
  scene.addComponent(scene.createEntity(), {
    camera: camera(),
  });

  scene.addComponent(scene.createEntity(), {
    ...defaultEntity(scene, [0, 100, -1], [337, 107, 1], 'juiced.png'),
    active: {},
  });

  scene.addComponent(scene.createEntity(), {
    ...defaultEntity(scene, [0, -50, -1], [257 / 2.5, 107 / 2.5, 1], 'play.png'),
    active: {},
  });

  scene.addComponent(scene.createEntity(), {
    ...defaultEntity(scene, [300, -120, -1], [20, 20, 1], 'blueJuice.png'),
    active: {},
  });

  scene.addComponent(scene.createEntity(), {
    ...defaultEntity(scene, [250, -80, -1], [20, 20, 1], 'strawberryJam.png'),
    active: {},
  });

  playerEntity(scene, [-250, -50, -2], [0, 0, 20], [177 / 4, 256 / 4, 1]);
  blueberry(scene, [300, -75, -2], [0, 0, -20], [32, 32, 1]);
  strawberry(scene, [225, -50, -2], [0, 0, 20], [32, 32, 1]);

  crosshair(scene, [0, 0, -1], [0, 0, 0], [12, 12, 1]);

  textEntity(scene, gl, `high-score: ${localStorage.getItem('highScore') ?? 1000}`, [0, -120, -1], 250);
  textEntity(scene, gl, `score: ${localStorage.getItem('lastScore') ?? 0}`, [0, -170, -1], 250);

  const input = scene.createEntity();
  scene.addComponent(input, { input: {} });
  scene.executeOnDispose(mouseMoveHandler(scene, canvas));
  scene.executeOnDispose(mouseClickHandler(scene, input, 'mousedown'));

  scene.update(0);

  scene.executeOnDispose(resizeHandler(scene, canvas, gl));
  scene.addSystem(crosshairMovementSystem);
  scene.addSystem(animate2D);
  scene.addSystem((scene) => {
    scene.query(['mousedown'], () => {
      scene.resources.popScene();
      scene.resources.pushScene(gameScene(decs, canvas, gl));
    });
  });

  scene.addSystem(calculateTransforms);
  scene.addSystem(renderer2D);
  return scene;
};
