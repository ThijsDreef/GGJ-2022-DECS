export default (scene) => {
  scene.query(['death'], () => {
    scene.query(['score'], ({ score }) => {
      localStorage.setItem('lastScore', score);
      if (score >= localStorage.getItem('highScore') ?? 0) {
        localStorage.setItem('highScore', score);
      }
    });
  }, ['active', 'player']);
};
