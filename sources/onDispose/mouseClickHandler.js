export default (scene, entity, component) => {
  const mouseUp = () => {
    if (!scene.entities[entity]) return;
    scene.removeComponent(entity, [component]);
  };
  const mouseDown = () => {
    if (!scene.entities[entity]) return;
    scene.addComponent(entity, { [component]: {} });
  };

  window.addEventListener('mouseup', mouseUp);
  window.addEventListener('mousedown', mouseDown);

  return () => {
    window.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('mousedown', mouseDown);
  };
};
