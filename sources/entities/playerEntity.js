import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import defaultShoot from '../components/shots/defaultShoot';

const playerBasicWeaponProxy = (
  scene,
  position,
  direction,
) => defaultShoot(scene, position, direction, true);

export default (scene, position, rotation, scale) => {
  const player = scene.createEntity();

  scene.addComponent(player, {
    position,
    rotation,
    scale,
    acceleration: [0, 0],
    transform: transform(),
    mesh: scene.resources.geometry.getModel('sprite'),
    materials: [
      material('sprite', [
        { name: 'textureMatrix', value: scene.resources.sprites.getSpriteTransformation('walkcycle-player1.png') },
        { name: 'textureAtlas', value: scene.resources.texture.getTexture('assets') },
      ]),
    ],
    gun: {
      shoot: playerBasicWeaponProxy,
      cooldown: 0.1,
      timer: 0.0,
    },
    player: {},
    active: {},
    heading: [0, 0],
    health: 50,
  });

  return player;
};
