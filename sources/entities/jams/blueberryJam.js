import defaultJam from './defaultJam';

export default (scene, position, scale) => {
  const blueberryJam = scene.createEntity();
  const data = {
    ...defaultJam(scene, [...position], scale, 'blueBerryHD1.png'),
    stawberryJam: {},
  };

  scene.addComponent(blueberryJam, data);
  return blueberryJam;
};
