import defaultEntity from '../../entities/defaultEntity';

export default (scene, position, direction, isPlayerBullet, damage) => {
  const bullet = scene.createEntity();
  scene.addComponent(bullet, {
    ...defaultEntity(scene, [...position], [6, 6], 'seed.png'),
    active: {},
    rotationSpeed: 960,
    acceleration: [...direction].map((item) => item * 350),
    [isPlayerBullet ? 'playerBullet' : 'enemyBullet']: {},
    damage,
  });
};
