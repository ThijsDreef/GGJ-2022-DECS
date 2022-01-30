export default (scene) => {
  let cam;
  scene.query(['camera'], ({ camera }) => {
    cam = camera;
  });
  scene.query(['screenPosition', 'position'], ({ screenPosition, position }) => {
    position[0] = screenPosition[0] - cam.view[12];
    position[1] = screenPosition[1] - cam.view[13];
  });
};
