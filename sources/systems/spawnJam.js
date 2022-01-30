import blueberryJam from '../entities/jams/blueberryJam';
import strawberryJam from '../entities/jams/strawberryJam';

export default (scene) => {
  scene.query(['death', 'position'], ({ position, strawberry: isStawBerry, blueberry: isBlueBerry }) => {
    if (isStawBerry) strawberryJam(scene, position, [16, 16, 1]);
    if (isBlueBerry) blueberryJam(scene, position, [16, 16, 1]);
  });
};
