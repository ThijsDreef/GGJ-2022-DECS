import defaultEntity from '../../entities/defaultEntity';

export default (scene, position, direction, isPlayerBullet, damage) => {
  const numberOfBullets = 3;
  for (let i = 0; i < numberOfBullets; i += 1) {
    const bullet = scene.createEntity();
    scene.addComponent(bullet, {
      ...defaultEntity(scene, [...position], [8, 8], 'blueberryjam.png'),
      active: {},
      rotationSpeed: 720,
      acceleration: [...direction].map(
        (item) => item * 200 + (Math.random() * 2 - 1) * 100 + Math.random() * 0.1,
      ),
      [isPlayerBullet ? 'playerBullet' : 'enemyBullet']: {},
      damage,
    });
  }
};