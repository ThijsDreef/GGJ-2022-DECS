const MAX_SPEED = 3.5 * 32;

export default (scene) => {
    scene.query(['acceleration'], ({ acceleration, moveLeft, moveRight, moveUp, moveDown }) => {
        const xDirection = moveLeft ? -1 : moveRight ? 1 : 0;
        const yDirection = moveUp ? 1 : moveDown ? -1 : 0;

        acceleration[1] = yDirection * MAX_SPEED;
        acceleration[0] = xDirection * MAX_SPEED;
    }, ['active', 'player']);
}