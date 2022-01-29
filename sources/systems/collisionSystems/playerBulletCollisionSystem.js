import collisionSystemHelper from './collisionSystemHelper';

export default (scene) => {
  const enemies = ['strawberry', 'blueberry'];
  for (let i = 0; i < enemies.length; i += 1) {
    collisionSystemHelper(scene, [enemies[i]], ['playerBullet'], (characterEntity, bulletEntity) => {
      characterEntity.data.health -= bulletEntity.data.damage;
      scene.deleteEntity(bulletEntity.id);
    });
  }
};
