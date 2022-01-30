export default (scene) => {
  scene.query(['death'], ({ points }, id) => {
    if (points) {
      scene.query(['score'], (data) => {
        data.score += points;
      });
    }
    scene.deleteEntity(id);
  });
};
