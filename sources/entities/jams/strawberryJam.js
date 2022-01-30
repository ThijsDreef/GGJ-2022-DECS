import defaultJam from './defaultJam';

export default (scene, position, scale) => {
  const strawberryJam = scene.createEntity();
  const data = {
    ...defaultJam(scene, [...position], scale, 'StrawBerryHD1.png'),
    stawberryJam: {},
  };

  scene.addComponent(strawberryJam, data);
  return strawberryJam;
};
