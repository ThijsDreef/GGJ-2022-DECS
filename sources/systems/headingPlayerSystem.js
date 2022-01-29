export default (scene) => {
  let mousePos;
  scene.query(['mousePosition'], ({ mousePosition }) => {
    mousePos = mousePosition; // setting mouse position
  });
  scene.query(['position', 'heading'], ({ position, heading }) => {
    const headingTemp = [
      position[0] - mousePos[0],
      position[1] - mousePos[1],
    ];
    const [x, y] = headingTemp;
    const length = Math.sqrt(x * x + y * y); // calculating length of vector for normal
    heading[0] = headingTemp[0] / length; // set heading
    heading[1] = headingTemp[1] / length;
  }, ['active', 'player']);
};
