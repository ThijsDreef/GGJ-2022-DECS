export default (scene, dt) => {
  scene.query(['score'], ((scoreData) => {
    scene.query(['interpolatedScore', 'mesh'], ((score) => {
      score.interpolatedScore += Math.ceil((scoreData.score - score.interpolatedScore) * dt / 4);
      score.mesh.text = `score: ${score.interpolatedScore}`;
      score.mesh.rebuildText();
    }));
  }));
};
