export default (scene, dt) => {
  scene.query(['rotation'], ({ rotation, rotationSpeed }) => {
    rotation[2] += (rotationSpeed ?? 0) * dt;
  }, ['active']);
};
