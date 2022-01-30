import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import WebGLText from '../resources/TextMesh';

export default (scene, gl, text, position, scale, additionalComponents = {}) => {
  const scoreText = new WebGLText(gl, scene.resources.font, text, 200, true, 1);
  scoreText.rebuildText();
  scene.addComponent(scene.createEntity(), {
    mesh: scoreText,
    active: {},
    transform: transform(),
    position,
    rotation: [0, 0, 0],
    scale: [scale, scale, 1],
    materials: [
      material('font', [
        { name: 'uTexture', value: scene.resources.texture.getTexture('font') },
      ]),
    ],
    ...additionalComponents,
  });
};
