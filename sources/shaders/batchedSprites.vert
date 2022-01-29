attribute vec2 position;
attribute vec2 uv;
attribute mat4 model;
attribute mat3 textureMatrix;

uniform mat4 mvp;

varying vec2 v_uv;

void main() {
    vec4 worldPos = model * vec4(vec3(position, -1.0), 1.0);
    // worldPos.w = 1.0;

    gl_Position = mvp * worldPos;
    v_uv = (vec3(uv, 1.0) * textureMatrix).xy;

}