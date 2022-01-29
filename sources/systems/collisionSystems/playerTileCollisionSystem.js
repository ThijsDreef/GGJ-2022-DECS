import tileCollisionSystemHelper from './tileCollisionSystemHelper';

export default (scene, dt) => {
  tileCollisionSystemHelper(scene, dt, [], ['player'], (first, second, dir) => {
    const { acceleration, position } = second.data;
    acceleration[0] *= dir[0] !== 0;
    acceleration[1] *= dir[1] !== 0;
    console.log(dir);
  });
};
