import Decs from 'decs';

import spriteVert from 'Decs/WebGL/shaders/sprite.vert';
import spriteFrag from 'Decs/webGL/shaders/batchSprite.frag';
import batchSpriteVert from './shaders/batchedSprites.vert';
import gameScene from './scenes/gameScene';

const canvas = document.querySelector('.game-canvas');
const gl = canvas.getContext('webgl', { antialias: false });
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

const main = async () => {
  const decs = new Decs(gl);
  await decs.loadManifest({
    texture: [{ name: 'assets', url: 'assets/texture.png', filter: 'NEAREST' }],
    sprites: ['assets/texture.json'],
  });
  decs.resources.shaders.createShader(
    `precision highp float;\n${batchSpriteVert}`,
    `precision highp float;\n${spriteFrag}`,
    'batchSprite',
    [
      { location: 0, name: 'position' },
      { location: 1, name: 'uv' },
      { location: 2, name: 'model' },
      { location: 6, name: 'textureMatrix' },
    ],
  );
  decs.resources.shaders.createShader(spriteVert, spriteFrag, 'sprite', [
    { location: 0, name: 'position' },
    { location: 1, name: 'uv' },
  ]);

  decs.pushScene(gameScene(decs, canvas, gl));
  decs.start();
};

main();
