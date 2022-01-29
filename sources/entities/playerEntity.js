import transform from 'decs/Components/transform';
import material from 'decs/Components/material';

const defaultShoot = (scene, position, direction) => {
  const bullet = scene.createEntity();
  scene.addComponent(bullet, {
    position: [...position],
    rotation: [0, 0, 0],
    scale: [6, 6],
    active: {},
    acceleration: [...direction].map((item) => item * 1000),
    transform: transform(),
    mesh: scene.resources.geometry.getModel('sprite'),
    materials: [
      material('sprite', [
        { name: 'textureMatrix', value: scene.resources.sprites.getSpriteTransformation('Bullet1.png') },
        { name: 'textureAtlas', value: scene.resources.texture.getTexture('assets') },
      ]),
    ],
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
      cooldown: 0.1,
      timer: 0.0,
    },
    player: {},
    active: {},
    heading: [0, 0],
  });

  return player;
};
