import mat4 from 'gl-mat4';
import { vec4 } from 'gl-matrix';

export default (scene, canvas) => {
  const entity = scene.createEntity();
  scene.addComponent(entity, { mousePosition: [0, 0] });
  const mouseMove = (e) => {
    let cameraTemp;
    scene.query(['camera'], ({ camera }) => {
      cameraTemp = camera;
    });

    const invproj = mat4.create();
    mat4.invert(invproj, cameraTemp.projection);

    const invCamera = mat4.create();
    mat4.invert(invCamera, cameraTemp.view);

    scene.query(['mousePosition'], ({ mousePosition }) => {
      // Create new vec4 to hold transformed coordinate.
      const position = vec4.create();
      // Set coord to NDC coordinates.
      position[0] = (e.x / canvas.width) * 2 - 1;
      position[1] = -((e.y / canvas.height) * 2 - 1);
      position[2] = 1;
      // Transform coordinate by inverse of projection to find coord before projection.
      vec4.transformMat4(position, position, invproj);

      // Transform coordinate by view matrix to get the point after view transform.

      // Store mouse position in component.
      mousePosition[0] = position[0];
      mousePosition[1] = position[1];
    });
  };

  canvas.addEventListener('mousemove', mouseMove);

  return () => {
    canvas.removeEventListener('mousemove', mouseMove);
  };
};
