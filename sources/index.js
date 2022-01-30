import Decs from 'decs';

import spriteVert from 'Decs/WebGL/shaders/sprite.vert';
import spriteFrag from 'Decs/webGL/shaders/batchSprite.frag';
import batchSpriteVert from './shaders/batchedSprites.vert';
import batchSpriteFrag from './shaders/batchedSprites.frag';
import fontVert from './shaders/default-font.vert';
import fontFrag from './shaders/default-font.frag';

import WebGLFont from './resources/WebglFont';

import gameScene from './scenes/gameScene';
import menuScene from './scenes/menuScene';

const canvas = document.querySelector('.game-canvas');
const gl = canvas.getContext('webgl', { antialias: false });
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

const main = async () => {
  const decs = new Decs(gl);
  await decs.loadManifest({
    texture: [
      { name: 'assets', url: 'assets/texture.png', filter: 'NEAREST' },
      { name: 'font', url: 'assets/editundo.png', filter: 'NEAREST' },
    ],
    sprites: ['assets/texture.json'],
  });

  decs.resources.font = new WebGLFont(await (await fetch('assets/editundo-msdf.json')).json());

  decs.resources.shaders.createShader(
    `precision highp float;\n${batchSpriteVert}`,
    `precision highp float;\n${batchSpriteFrag}`,
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

  decs.resources.shaders.createShader(fontVert, fontFrag, 'font', [
    { location: 0, name: 'position' },
    { location: 1, name: 'uv' },
  ]);
  decs.pushScene(menuScene(decs, canvas, gl));
  decs.start();
};

main();
