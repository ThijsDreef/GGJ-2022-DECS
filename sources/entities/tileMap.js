import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import BatchedSprite from 'decs/WebGL/renderResources/BatchedSprite';

const TILE_SIZE = 32;

export default (scene, position, data, texture, gl) => {
  const tileEntity = scene.createEntity();
  const mesh = new BatchedSprite(gl);

  let instances = 0;
  for (let x = 0; x < data.length; x += 1) {
    for (let y = 0; y < data[x].length; y += 1) {
      instances += 1;
      const tx = x - Math.floor(data.length / 2);
      const ty = y - Math.floor(data[x].length / 2);
      const model = [
        TILE_SIZE / 2, 0, 0, 0,
        0, TILE_SIZE / 2, 0, 0,
        0, 0, 1, 0,
        tx * TILE_SIZE + TILE_SIZE / 2, ty * TILE_SIZE + TILE_SIZE / 2, -1, 1,
      ];
      mesh.addSprite({
        matrix: model,
        frame: [...scene.resources.sprites.getSpriteTransformation(data[x][y].sprite)],
      });
    }
  }
  mesh.ranges = [
    { start: 0, end: instances },
  ];
  mesh.compileBuffers();
  const collisionData = data.map((item) => item.map((value) => (value ? 0 : 1)));

  scene.addComponent(tileEntity, {
    tileCollision: collisionData,
    position,
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    transform: transform(),
    materials: [
      material('batchSprite', [
        { name: 'textureAtlas', value: texture },
      ]),
    ],
    mesh,
    active: {},
  });
};
