const TILE_SIZE = 32;

export default (scene, dt, entitySpecifierOne, entitySpecifierTwo, collisionCallback) => {
  scene.query(['position', 'tileCollision'], (outerEntityData, outerEntityId) => {
    const { position: tilePosition, tileCollision } = outerEntityData;
    const { width, height, collisionData } = tileCollision;
    scene.query(['position', 'scale', 'acceleration'], (innerEntityData, innerEntityId) => {
      const { position: innerEntityPosition, scale, acceleration } = innerEntityData;
      const tx = Math.floor((innerEntityPosition[0] - tilePosition[0] + scale[0] * Math.sign(acceleration[0])) / TILE_SIZE);
      const ty = Math.floor((innerEntityPosition[1] - tilePosition[1] + scale[1] * Math.sign(acceleration[1])) / TILE_SIZE);
      const x = Math.floor((innerEntityPosition[0] - tilePosition[0] + acceleration[0] * dt + scale[0] * Math.sign(acceleration[0])) / TILE_SIZE);
      const y = Math.floor((innerEntityPosition[1] - tilePosition[1] + acceleration[1] * dt + scale[1] * Math.sign(acceleration[1])) / TILE_SIZE);
      if (x < 0 || x > width || y < 0 || y > height) return;
      if (collisionData[x + y * width]) {
        collisionCallback(
          { id: outerEntityId, data: outerEntityData },
          { id: innerEntityId, data: innerEntityData },
          [x - tx, y - ty],
        );
      }
    }, ['active', ...entitySpecifierTwo]);
  }, ['active', ...entitySpecifierOne]);
};
