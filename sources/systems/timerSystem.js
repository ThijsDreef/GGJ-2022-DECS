export default (scene, dt) => {
  scene.query(['timer'], (data) => {
    data.timer += dt;
  });
};
