attribute vec3 vertex;
attribute vec4 color;

uniform mat4 p_matrix;
uniform mat4 mv_matrix;

varying vec4 frag_color;

void main(void) {
    gl_Position = p_matrix * mv_matrix * vec4(vertex, 1.0);
    gl_PointSize = 10.0;
    frag_color = color;
}
