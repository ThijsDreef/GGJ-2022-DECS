import defaultEntity from '../defaultEntity';

export default (scene, position, scale, texture) => {
  const defaultJam = scene.createEntity();
  const data = {
    ...defaultEntity(scene, [...position], [...scale], texture),
    active: {},
    pickUp: () => {},
    jam: {},
  };
  scene.addComponent(defaultJam, data);
  return defaultJam;
};
