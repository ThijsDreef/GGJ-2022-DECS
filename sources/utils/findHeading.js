export default (pos1, pos2) => {
  const heading = [];
  const headingTemp = [
    pos1[0] - pos2[0],
    pos1[1] - pos2[1],
  ];
  const [x, y] = headingTemp;
  const length = Math.sqrt(x * x + y * y); // calculating length of vector for normal
  heading[0] = headingTemp[0] / length; // set heading
  heading[1] = headingTemp[1] / length;
  return heading;
};
