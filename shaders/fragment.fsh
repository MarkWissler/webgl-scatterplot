#ifdef GL_ES
    precision highp float;
#endif

varying vec4 frag_color;

void main(void) {
    gl_FragColor = vec4(1.0,1.0,1.0,1.0);//frag_color;
}
