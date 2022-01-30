import findHeading from '../utils/findHeading';

export default (scene) => {
  let mousePos;
  scene.query(['crosshair', 'position'], ({ position }) => {
    mousePos = position; // setting mouse position
  });
  scene.query(['position', 'heading'], ({ position, heading }) => {
    const headingTemp = findHeading(mousePos, position);
    heading[0] = headingTemp[0]; // set heading
    heading[1] = headingTemp[1];
  }, ['active', 'player']);
};
