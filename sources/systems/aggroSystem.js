export default (scene) => {
  scene.query(['aggro', 'position'], ({ aggro, position: aggroObjectPos, target }, id) => {
    if (target) {
      let distToTarget;
      scene.query(['position'], ({ position }) => {
        const x = position[0] - aggroObjectPos[0];
        const y = position[1] - aggroObjectPos[1];
        distToTarget = Math.sqrt((x * x) + (y * y));
      }, ['active', ...aggro.target]);

      if (distToTarget > aggro.distance || !scene.entities[target.entity]) {
        scene.removeComponent(id, ['target', ...Object.keys(aggro.onAggro)]);
      }
    } else {
      scene.query(['position'], ({ position }, targetEntity) => {
        const x = position[0] - aggroObjectPos[0];
        const y = position[1] - aggroObjectPos[1];
        const distance = Math.sqrt((x * x) + (y * y));
        if (distance <= aggro.distance) {
          scene.addComponent(id, {
            target: {
              position,
              entity: targetEntity,
            },
            ...aggro.onAggro,
          });
        }
      }, ['active', ...aggro.target]);
    }
  }, ['active']);
};
