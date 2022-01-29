import defaultEntity from '../../entities/defaultEntity';

export default (scene, position, direction, isPlayerBullet, damage) => {
  for (let i = 0; i < 10; i += 1) {
    const bullet = scene.createEntity();
    scene.addComponent(bullet, {
      ...defaultEntity(scene, [...position], [6, 6], 'Bullet1.png'),
      active: {},
      acceleration: [...direction].map(
        (item) => item * 500 + (Math.random() * 2 - 1) * 100 + Math.random() * 0.1,
      ),
      [isPlayerBullet ? 'playerBullet' : 'enemyBullet']: {},
      damage,
    });
  }
};
