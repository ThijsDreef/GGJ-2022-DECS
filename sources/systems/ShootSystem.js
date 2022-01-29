export default (scene, dt) => {
  scene.query(['position', 'gun', 'heading'], ({
    position, gun, heading, fire,
  }) => {
    gun.timer += dt;
    if (gun.timer > gun.cooldown && fire) {
      gun.timer = 0;
      gun.shoot(scene, position, heading);
    }
  }, ['active']);
};
