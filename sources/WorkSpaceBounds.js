// The space inside of the world space in which physical characters should be spawned (not inside of walls).
export const BOUNDS = [[2, 2], [30, 30]];

export const X_DIFF = (BOUNDS[1][0] - BOUNDS[0][0]);
export const Y_DIFF = (BOUNDS[1][1] - BOUNDS[0][1]);