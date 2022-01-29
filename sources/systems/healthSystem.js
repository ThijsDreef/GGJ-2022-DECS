export default (scene) => {
  scene.query(['health'], ({ health }, id) => {
    if (health <= 0) {
      scene.deleteEntity(id);
    }
  }, ['active']);
};
