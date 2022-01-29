import transform from 'decs/Components/transform';
import material from 'decs/Components/material';
import BatchedSprite from 'decs/WebGL/renderResources/BatchedSprite';

const TILE_SIZE = 32;

export default (scene, position, data, texture, gl) => {
  const tileEntity = scene.createEntity();
  const mesh = new BatchedSprite(gl);

  let instances = 0;
  for (let x = 0; x < data.width; x += 1) {
    for (let y = 0; y < data.height; y += 1) {
      const tile = data.map[x + y * data.width];
      if (tile.sprite) {
        instances += 1;
        const model = [
          TILE_SIZE / 2, 0, 0, 0,
          0, TILE_SIZE / 2, 0, 0,
          0, 0, 1, 0,
          x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, -1, 1,
        ];
        mesh.addSprite({
          matrix: model,
          frame: [...scene.resources.sprites.getSpriteTransformation(tile.sprite)],
        });
      }
    }
  }
  mesh.ranges = [
    { start: 0, end: instances },
  ];
  mesh.compileBuffers();
  const collisionData = data.map.map((item) => item.collision);
  scene.addComponent(tileEntity, {
    tileCollision: {
      width: data.width,
      height: data.height,
      collisionData,
    },
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
