import defaultEntity from '../../entities/defaultEntity';

export default (scene, position, direction, isPlayerBullet, damage) => {
  const bullet = scene.createEntity();
  scene.addComponent(bullet, {
    ...defaultEntity(scene, [...position], [10, 10, 1], 'blade.png'),
    active: {},
    acceleration: [...direction].map((item) => item * 400),
    [isPlayerBullet ? 'playerBullet' : 'enemyBullet']: {},
    damage,
    bullet: {},
    rotationSpeed: 1440,
  });
};
