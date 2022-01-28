import Decs from 'decs';
import gameScene from './scenes/gameScene';

import spriteVert from 'Decs/WebGL/shaders/sprite.vert';
import spriteFrag from 'Decs/webGL/shaders/batchSprite.frag';

const canvas = document.querySelector('.game-canvas');
const gl = canvas.getContext('webgl');
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

const main = async () => {
    const decs = new Decs(gl);
    await decs.loadManifest({
	
    });

    decs.resources.shaders.createShader(
	spriteVert,
	spriteFrag,
	'sprite',
	[
	    { location: 0, name: 'position' },
	    { location: 1, name: 'uv' },
	]
    );

    decs.pushScene(gameScene(decs, canvas, gl));
    decs.start();
}

main();
