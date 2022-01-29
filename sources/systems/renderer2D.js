import mat4 from 'gl-mat4';

/**
 * Renders all entities with the components: [transform, mesh, materials, active].
 */
export default (decs) => {
  const mvp = mat4.create();
  const vp = mat4.create();

  let p;
  let v;
  decs.query(['camera'], ({ camera }) => {
    p = camera.projection;
    v = camera.view;
  });
  mat4.multiply(vp, p, v);

  const { shaders } = decs.resources;
  const renderCalls = [];
  decs.query(['transform', 'mesh', 'materials', 'position'], ({
    transform, mesh, materials, position,
  }) => {
    mat4.multiply(mvp, vp, transform);
    renderCalls.push({
      mvp: new Float32Array(mvp),
      mesh,
      materials,
      position,
    });
  }, ['active']);

  renderCalls.sort((item, otherItem) => item.position[2] - otherItem.position[2]);

  for (let i = 0; i < renderCalls.length; i += 1) {
    const { mesh, materials } = renderCalls[i];
    for (let j = 0; j < mesh.ranges.length; j += 1) {
      const range = mesh.ranges[j];
      const material = materials[j % materials.length];
      const shader = shaders.getShader(material.name);
      shader.bind();
      shader.uniforms.mvp(renderCalls[i].mvp);
      for (let k = 0; k < material.uniforms.length; k += 1) {
        const uniform = material.uniforms[k];
        shader.uniforms[uniform.name](uniform.value);
      }
      mesh.render(range.start, range.end);
    }
  }
};
