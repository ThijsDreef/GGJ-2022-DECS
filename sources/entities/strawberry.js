import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import animation2D from 'decs/Components/animation2D';

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
    enemyBullet: {},
  });
};

export default (scene, position, rotation, scale) => {
  const strawberry = scene.createEntity();
  const data = {
    position,
    rotation,
    scale,
    transform: transform(),
    mesh: scene.resources.geometry.getModel('sprite'),
    animation2D: animation2D([
      { duration: 0.1, name: 'StrawBerryHD1.png' },
      { duration: 0.1, name: 'StrawBerryHD2.png' },
      { duration: 0.1, name: 'StrawBerryHD3.png' },
      { duration: 0.1, name: 'StrawBerryHD4.png' },
      { duration: 0.1, name: 'StrawBerryHD3.png' },
      { duration: 0.1, name: 'StrawBerryHD2.png' },
      { duration: 0.1, name: 'StrawBerryHD1.png' },
    ], true),
    materials: [
      material('sprite', [
        { name: 'textureMatrix', value: scene.resources.sprites.getSpriteTransformation('StrawBerryHD1.png') },
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
    strawberry: {},
    gun: {
      shoot: defaultShoot,
      cooldown: 0.3,
      timer: 0.0,
    },
  }
  data.materials[0].uniforms[0].value = data.animation2D.matrix;

  scene.addComponent(strawberry, data);
};
