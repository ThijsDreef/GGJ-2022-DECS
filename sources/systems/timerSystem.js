export default (scene, dt) => {
  scene.query(['timeSinceStart'], (data) => {
    data.timeSinceStart += dt;
  });
};
