import transform from 'decs/Components/transform';
import material from 'decs/Components/material';

const defaultShoot = (scene, position, direction) => {
  const bullet = scene.createEntity();
  scene.addComponent(bullet, {
    position: [...position],
    rotation: [0, 0, 0],
    scale: [4, 4],
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

  });
};

export default (scene, position, rotation, scale) => {
  const strawberry = scene.createEntity();

  scene.addComponent(strawberry, {
    position,
    rotation,
    scale,
    transform: transform(),
    mesh: scene.resources.geometry.getModel('sprite'),
    materials: [
      material('sprite', [
        { name: 'textureMatrix', value: scene.resources.sprites.getSpriteTransformation('red-enemy-idle1.png') },
        { name: 'textureAtlas', value: scene.resources.texture.getTexture('assets') },
      ]),
    ],
    active: {},
    aggro: {
      distance: 32 * 10,
      target: ['player'],
      onAggro: {
        fire: {},
      },
    },
    heading: [0, 0],

    gun: {
      shoot: defaultShoot,
      cooldown: 0.3,
      timer: 0.0,
    },
  });
};
