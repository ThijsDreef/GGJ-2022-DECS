import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import defaultEntity from './defaultEntity';
import animation2D from 'decs/Components/animation2D';

const defaultShoot = (scene, position, direction) => {
  const bullet = scene.createEntity();
  scene.addComponent(bullet, {
    ...defaultEntity(scene, [...position], [6, 6], 'Bullet1.png'),
    active: {},
    acceleration: [...direction].map((item) => item * 1000),
    playerBullet: {},
    damage: 25,
  });
};

export default (scene, position, rotation, scale) => {
  const player = scene.createEntity();
  const data = {
    position,
    rotation,
    scale,
    acceleration: [0, 0],
    transform: transform(),
    mesh: scene.resources.geometry.getModel('sprite'),
    animation2D: animation2D([
      { duration: 0.1, name: 'Blender1.png' },
      { duration: 0.1, name: 'Blender2.png' },
      { duration: 0.1, name: 'Blender3.png' },
      { duration: 0.1, name: 'Blender4.png' },
      { duration: 0.1, name: 'Blender5.png' },
      { duration: 0.1, name: 'Blender4.png' },
      { duration: 0.1, name: 'Blender3.png' },
      { duration: 0.1, name: 'Blender2.png' },
      { duration: 0.1, name: 'Blender1.png' },
    ], true),
    materials: [
      material('sprite', [
        { name: 'textureMatrix', value: scene.resources.sprites.getSpriteTransformation('Blender1.png') },
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
    health: 50,
  }
  data.materials[0].uniforms[0].value = data.animation2D.matrix;
  scene.addComponent(player, data);
  return player;
};
