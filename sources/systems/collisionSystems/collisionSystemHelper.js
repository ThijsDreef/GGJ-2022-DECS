export default (scene, entitySpecifierOne, entitySpecifierTwo, collisionCallback) => {
  const NUMBER_OF_DIMENSIONS_IN_POSITION = 2;

  scene.query(['position', 'scale'], (outerEntityData, outerEntityId) => {
    const { position: outerEntityPosition, scale: outerEntityScale } = outerEntityData;
    scene.query(['position', 'scale'], (innerEntityData, innerEntityId) => {
      const { position: innerEntityPosition, scale: innerEntityScale } = innerEntityData;
      let collision = true;
      for (let i = 0; i < NUMBER_OF_DIMENSIONS_IN_POSITION; i += 1) {
        const distance = Math.abs(innerEntityPosition[i] - outerEntityPosition[i]);
        /* eslint no-bitwise: "off" */
        collision &= distance <= Math.abs(innerEntityScale[i]) + Math.abs(outerEntityScale[i]);
      }
      if (collision) {
        collisionCallback({id: outerEntityId, data: outerEntityData}, {id: innerEntityId, data: innerEntityId});
      }
    }, ['active', ...entitySpecifierTwo]);
  }, ['active', ...entitySpecifierOne]);
};
