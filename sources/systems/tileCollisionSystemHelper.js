export default (scene, target, callback) => {
  scene.query(['tileCollsion', 'position'], ({ tileCollision, position }) => {
    scene.query(['acceleration', 'position', 'scale'], ({ acceleration, position, scale }) => {

    });
  });
};
