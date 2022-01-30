import collisionSystemHelper from './collisionSystemHelper';

export default (scene) => {
  const jams = ['blueberryJam', 'stawberryJam'];
  for (let i = 0; i < jams.length; i += 1) {
    collisionSystemHelper(scene, ['player'], [jams[i]], (characterEntity, jamEntity) => {
      jamEntity.data.pickUp();
    });
  }
};
