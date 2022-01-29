import collisionSystemHelper from './collisionSystemHelper';

export default (scene) => {
  collisionSystemHelper(scene, ['player'], ['enemyBullet'], (characterEntity, bulletEntity) => {
    scene.deleteEntity(characterEntity.id);
    scene.deleteEntity(bulletEntity.id);
  });
};
