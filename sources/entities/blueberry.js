import transform from 'Decs/Components/transform';
import material from 'Decs/Components/material';

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
        { name: 'textureMatrix', value: scene.resources.sprites.getSpriteTransformation('blue-enemy-idle1.png') },
        { name: 'textureAtlas', value: scene.resources.texture.getTexture('assets') },
	    ]),
    ],
    active: {},
  });
};
