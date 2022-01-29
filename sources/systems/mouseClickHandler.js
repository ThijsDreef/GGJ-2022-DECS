export default (scene, entity) => {
  const mouseUp = () => {
    scene.removeComponent(entity, { mouseDown: {} });
  };
  const mouseDown = () => {
    scene.addComponent(entity, { mouseDown: {} });
  };

  window.addEventListener('mouseup', mouseUp);
  window.addEventListener('mousedown', mouseDown);

  return () => {
    window.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('mousedown', mouseDown);
  };
};
