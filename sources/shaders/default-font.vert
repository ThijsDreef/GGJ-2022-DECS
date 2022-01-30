precision highp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 mvp;

varying vec2 v_uv;

void main(void) {
    v_uv = uv;
    gl_Position = mvp * vec4(position, 1.0);
}