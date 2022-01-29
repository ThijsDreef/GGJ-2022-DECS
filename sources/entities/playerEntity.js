import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import defaultEntity from './defaultEntity';

const defaultShoot = (scene, position, direction) => {
  const bullet = scene.createEntity();
  scene.addComponent(bullet, {
    ...defaultEntity(scene, [...position], [6, 6], 'Bullet1.png'),
    active: {},
    acceleration: [...direction].map((item) => item * 1000),
    playerBullet: {},
  });
};

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
      shoot: defaultShoot,
      cooldown: 0.5,
      timer: 0.0,
    },
    player: {},
    active: {},
    heading: [0, 0],
  });

  return player;
};
