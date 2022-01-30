precision highp float;
uniform sampler2D uTexture;

varying vec2 v_uv;

float median(vec3 color) {
    return max(min(color.x, color.y), min(max(color.x, color.y), color.z));
}

float msdfOpacity(vec3 msdf) {
    float sigDist = 8.0 * (median(msdf) - 0.5);
    float alpha = clamp(sigDist + 0.5, 0.0, 1.0);
    return alpha;
}

void main(void) {
    float opacity = msdfOpacity(texture2D(uTexture, v_uv).xyz);
    gl_FragColor.xyz = vec3(1.0, 1.0, 1.0);
    gl_FragColor.w = opacity;
    gl_FragColor.x = 1.0;
}