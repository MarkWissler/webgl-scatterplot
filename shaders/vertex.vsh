attribute vec3 vertex;
attribute vec3 color;

uniform mat4 p_matrix;
uniform mat4 mv_matrix;

varying vec3 frag_color;

void main(void) {
    gl_Position = p_matrix * mv_matrix * vec4(vertex, 1.0);
    gl_PointSize = 10.0;
    frag_color = color;
}
