export default (scene, dt) => {
  scene.query(['camera', 'position', 'target'], ({ camera, position, target }) => {
    if (scene.entities[target.entity]);
    position[0] += (target.position[0] - position[0]) * dt * 2;
    position[1] += (target.position[1] - position[1]) * dt * 2;

    camera.view[12] = -position[0];
    camera.view[13] = -position[1];
  });
};
