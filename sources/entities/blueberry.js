import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import animation2D from 'decs/Components/animation2D';

export default (scene, position, rotation, scale) => {
  const blueberry = scene.createEntity();
  const data = {
    position,
    rotation,
    scale,
    transform: transform(),
    mesh: scene.resources.geometry.getModel('sprite'),
    animation2D: animation2D([
      { duration: 0.1, name: 'blueBerryHD1.png' },
      { duration: 0.1, name: 'blueBerryHD2.png' },
      { duration: 0.1, name: 'blueBerryHD3.png' },
      { duration: 0.1, name: 'blueBerryHD4.png' },
      { duration: 0.1, name: 'blueBerryHD3.png' },
      { duration: 0.1, name: 'blueBerryHD2.png' },
      { duration: 0.1, name: 'blueBerryHD1.png' },
    ], true),
    materials: [
      material('sprite', [
        {
          name: 'textureMatrix',
          value: scene.resources.sprites.getSpriteTransformation(
            'blueBerryHD1.png',
          ),
        },
        {
          name: 'textureAtlas',
          value: scene.resources.texture.getTexture('assets'),
        },
      ]),
    ],
    active: {},
  };

  data.materials[0].uniforms[0].value = data.animation2D.matrix;

  scene.addComponent(blueberry, data);
};
