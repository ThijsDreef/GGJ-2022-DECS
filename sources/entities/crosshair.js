import transform from 'decs/Components/transform';
import material from 'decs/Components/material';

export default (scene, position, rotation, scale) => {
  const crosshair = scene.createEntity();

  scene.addComponent(crosshair, {
    position,
    rotation,
    scale,
    transform: transform(),
    mesh: scene.resources.geometry.getModel('sprite'),
    materials: [
      material('sprite', [
        { name: 'textureMatrix', value: scene.resources.sprites.getSpriteTransformation('blue-enemy-idle1.png') },
        { name: 'textureAtlas', value: scene.resources.texture.getTexture('assets') },
      ]),
    ],
    crosshair: {},
    active: {},
  });
};
