import transform from 'decs/Components/transform';
import material from 'decs/Components/material';

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
      target: ["player"],
    },
  });
};
