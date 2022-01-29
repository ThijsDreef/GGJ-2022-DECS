const MAX_SPEED = 6 * 32;

export default (scene) => {
  scene.query(['input'], ({
    moveLeft, moveRight, moveUp, moveDown,
  }) => {
    scene.query(['acceleration'], ({ acceleration }) => {
      const xDirection = moveLeft ? -1 : moveRight ? 1 : 0;
      const yDirection = moveUp ? 1 : moveDown ? -1 : 0;

      acceleration[1] = yDirection * MAX_SPEED;
      acceleration[0] = xDirection * MAX_SPEED;
    }, ['active', 'player']);
  });
};
