import tileCollisionSystemHelper from './tileCollisionSystemHelper';

export default (scene, dt) => {
  tileCollisionSystemHelper(scene, dt, [], ['bullet'], (first, second, dir) => {
    scene.deleteEntity(second.id);
  });
};
