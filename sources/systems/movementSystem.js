export default (scene, dt) => {
  scene.query(['acceleration', 'position'], ({ acceleration, position }) => {
    position[0] += acceleration[0] * dt;
    position[1] += acceleration[1] * dt;
  }, ['active']);
};
