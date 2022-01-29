export default (scene) => {
  let mouse;
  scene.query(['mousePosition'], ({ mousePosition }) => {
    mouse = mousePosition;
  });
  let cam;
  scene.query(['camera'], ({ camera }) => {
    cam = camera;
  });
  scene.query(['position'], ({ position }) => {
    position[0] = mouse[0] - cam.view[12];
    position[1] = mouse[1] - cam.view[13];
  }, ['active', 'crosshair']);
};
