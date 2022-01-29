export default (scene) => {
  scene.query(['aggro', 'position'], ({ aggro, position: aggroObjectPos }, id) => {
    scene.query(['position'], ({ position }) => {
      const x = position[0] - aggroObjectPos[0];
      const y = position[1] - aggroObjectPos[1];
      const distance = Math.sqrt((x * x) + (y * y));
      if (distance <= aggro.distance) {
        scene.removeComponent(id, ['aggro']);
        scene.addcomponent(id, {
          target: position,
        });
      }
    }, ['active', ...aggro.target]);
  }, ['active']);
};
