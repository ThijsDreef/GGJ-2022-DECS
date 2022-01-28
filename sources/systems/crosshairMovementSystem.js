export default (scene) => {
  let mouse;
  scene.query(['mousePosition'], ({ mousePosition }) => {
    mouse = mousePosition;
  });
  scene.query(['position'], ({ position }) => {
    position[0] = mouse[0];
    position[1] = mouse[1];
  }, ['active', 'crosshair']);
};
