export default (scene) => {
  scene.query(['position', 'target', 'heading'], ({ position, target, heading }) => {
    const headingTemp = [
      target[0] - position[0],
      target[1] - position[1],
    ];
    const [x, y] = headingTemp;
    const length = Math.sqrt(x * x + y * y); // calculating length of vector for normal
    heading[0] = headingTemp[0] / length; // set heading
    heading[1] = headingTemp[1] / length;
  });
};
