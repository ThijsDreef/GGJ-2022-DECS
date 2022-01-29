import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import animation2D from 'decs/Components/animation2D';
import defaultShoot from '../components/shots/defaultShoot';

const strawberryProxy = (
  scene,
  position,
  direction,
) => defaultShoot(scene, position, direction, false, 10);

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
    health: 50,
    gun: {
      shoot: strawberryProxy,
      cooldown: 0.3,
      timer: 0.0,
    },
  };
  data.materials[0].uniforms[0].value = data.animation2D.matrix;
  scene.addComponent(strawberry, data);
};
