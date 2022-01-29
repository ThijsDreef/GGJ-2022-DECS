import transform from 'decs/Components/transform';
import material from 'decs/Components/material';

export default (scene, position, scale, texture) => ({
  position,
  rotation: [0, 0, 0],
  scale,
  transform: transform(),
  mesh: scene.resources.geometry.getModel('sprite'),
  materials: [
    material('sprite', [
      { name: 'textureMatrix', value: scene.resources.sprites.getSpriteTransformation(texture) },
      { name: 'textureAtlas', value: scene.resources.texture.getTexture('assets') },
    ]),
  ],
});
