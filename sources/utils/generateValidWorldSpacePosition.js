import { BOUNDS, X_DIFF, Y_DIFF } from '../WorkSpaceBounds';

export default () => {
  const randomValidX = BOUNDS[0][0] + Math.random() * X_DIFF;
  const randomValidY = BOUNDS[0][1] + Math.random() * Y_DIFF;
  return [randomValidX, randomValidY];
};
