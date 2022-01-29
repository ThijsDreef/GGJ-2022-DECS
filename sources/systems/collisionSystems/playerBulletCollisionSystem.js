import collisionSystemHelper from './collisionSystemHelper';

export default (scene) => {
  collisionSystemHelper(scene, ['strawberry'], ['playerBullet'], (characterEntity, bulletEntity) => {
    scene.deleteEntity(characterEntity.id);
    scene.deleteEntity(bulletEntity.id);
  });
};
