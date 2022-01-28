export default (scene, entity) => {
  const mouseUp = (e) => {
    scene.removeComponent(entity, { mouseDown: {} });
  };
  const mouseDown = (e) => {
    scene.addComponent(entity, { mouseDown: {} });
  };

  window.addEventListener('mouseup', mouseUp);
  window.addEventListener('mousedown', mouseDown);

  return () => {
    window.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('mousedown', mouseDown);
  };
};
