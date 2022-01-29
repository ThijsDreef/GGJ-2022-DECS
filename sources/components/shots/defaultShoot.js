import defaultEntity from '../../entities/defaultEntity';

export default (scene, position, direction, isPlayerBullet) => {
  const bullet = scene.createEntity();
  scene.addComponent(bullet, {
    ...defaultEntity(scene, [...position], [6, 6], 'Bullet1.png'),
    active: {},
    acceleration: [...direction].map((item) => item * 1000),
    [isPlayerBullet ? 'playerBullet' : 'enemyBullet']: {},
    damage: 15,
  });
};
