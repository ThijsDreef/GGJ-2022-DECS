precision highp float;

varying vec2 v_uv;

uniform sampler2D textureAtlas;

void main() {
    gl_FragColor = texture2D(textureAtlas, v_uv);
}