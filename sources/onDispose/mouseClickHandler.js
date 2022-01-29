export default (scene, entity, component) => {
  const mouseUp = () => {
    scene.removeComponent(entity, [component]);
  };
  const mouseDown = () => {
    scene.addComponent(entity, { [component]: {} });
  };

  window.addEventListener('mouseup', mouseUp);
  window.addEventListener('mousedown', mouseDown);

  return () => {
    window.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('mousedown', mouseDown);
  };
};
