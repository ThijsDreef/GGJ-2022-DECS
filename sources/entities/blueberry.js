import transform from 'decs/Components/transform';
import material from 'decs/Components/material';

export default (scene, position, rotation, scale) => {
  const blueberry = scene.createEntity();

  scene.addComponent(blueberry, {
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
    active: {},
  });
};
