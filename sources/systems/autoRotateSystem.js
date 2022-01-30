export default (scene, dt) => {
  scene.query(['rotation', 'rotationSpeed'], ({ rotation, rotationSpeed }) => {
    rotation[2] += (rotationSpeed ?? 0) * dt;
  }, ['active']);
};
