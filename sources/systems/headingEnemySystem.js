import findHeading from '../utils/findHeading';

export default (scene) => {
  scene.query(['position', 'target', 'heading'], ({ position, target, heading }) => {
    if (scene.entities[target.entity]) {
      const headingTemp = findHeading(target.position, position);
      heading[0] = headingTemp[0];
      heading[1] = headingTemp[1];
    }
  });
};
