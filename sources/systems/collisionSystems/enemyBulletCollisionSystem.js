import collisionSystemHelper from './collisionSystemHelper';

export default (scene) => {
  collisionSystemHelper(scene, ['player'], ['enemyBullet'], (characterEntity, bulletEntity) => {
    characterEntity.data.health -= bulletEntity.data.damage;
    scene.deleteEntity(bulletEntity.id);
  });
};
