import mat4 from 'gl-mat4';
import WorldSpaceScreen from '../WorldSpaceScreen';

export default (scene, canvas, gl) => {
  const resize = () => {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    gl.viewport(0, 0, canvas.width, canvas.height);

    scene.query(['camera'], ({ camera }, eid) => {
      const { width } = canvas;
      const { height } = canvas;
      const aspect = width / height;
      const psh = (WorldSpaceScreen.height / 2);
      if (width > height) {
        mat4.ortho(camera.projection, -aspect * psh, aspect * psh, -psh, psh, 1, 100);
      } else {
        let psw = (WorldSpaceScreen.width / 2);
        const inverseAspect = 1 / aspect;
        psw *= Math.max(1, psh / (psw * inverseAspect));
        mat4.ortho(camera.projection, -psw, psw, -psw * inverseAspect, psw * inverseAspect, 1, 100);
      }
      mat4.identity(camera.view);
    });
  };

  resize();
  window.addEventListener('resize', resize);
  return () => {
    window.removeEventListener('resize', resize);
  };
};
