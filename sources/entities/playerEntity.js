import transform from 'decs/Components/transform';
import material from 'decs/Components/material';

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
    player: {},
    active: {},
  });

  return player;
};
