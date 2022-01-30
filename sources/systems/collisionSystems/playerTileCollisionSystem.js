import tileCollisionSystemHelper from './tileCollisionSystemHelper';

export default (scene, dt) => {
  tileCollisionSystemHelper(scene, dt, [], ['player'], (first, second, dir) => {
    const { acceleration } = second.data;
    acceleration[0] *= dir[0];
    acceleration[1] *= dir[1];
  });
};
