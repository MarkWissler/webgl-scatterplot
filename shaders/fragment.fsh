#ifdef GL_ES
    precision highp float;
#endif

varying vec3 frag_color;

void main(void) {

    gl_FragColor = vec4(frag_color, 1.0);
}
