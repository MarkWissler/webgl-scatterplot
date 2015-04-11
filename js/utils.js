// We inject `render()` into rAF. Lots of benefits for doing so: http://learningwebgl.com/blog/?p=3189
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// Sizes the canvas element. If we put the canvas inside another element, we should replace `window` with the element's size.
window.onresize = function () {
  document.getElementById("webgl-scatterplot-canvas").height = window.innerHeight-20;
  document.getElementById("webgl-scatterplot-canvas").width = window.innerWidth-20;
};

/**
 * Establishes the webGL context. If we need to do browser compatibility testing, do it here with a try/catch.
 */
function initGL(canvas) {
  gl = canvas.getContext("experimental-webgl");
  gl.viewportWidth = window.innerWidth-20;
  gl.viewportHeight = window.innerWidth-20;
  document.getElementById("webgl-scatterplot-canvas").height = window.innerHeight-20;
  document.getElementById("webgl-scatterplot-canvas").width = window.innerWidth-20;
}

/**
 * Launches the shaders.
 */
function initUberShader() {
  getShader("fragment.fsh");
  getShader("vertex.vsh");
}

/**
 * Gets the shaders and compiles them.
 */
function getShader(file) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var shader
        if (file === "fragment.fsh") {
          shader = gl.createShader(gl.FRAGMENT_SHADER);
          fragment_shader = shader;
        } else if (file === "vertex.vsh") {
          shader = gl.createShader(gl.VERTEX_SHADER);
          vertex_shader = shader;
        }

        gl.shaderSource(shader, xhr.responseText);
        gl.compileShader(shader);

        if (vertex_shader && fragment_shader) {
          console.log("Shaders loaded.");
          populateShader();
        }
      }
    }
  }
  xhr.open("GET", "shaders/" + file);
  xhr.send();
}

/**
 * Does some one-time registration of attributes and uniforms.
 */
function populateShader() {
  ubershader = gl.createProgram();
  gl.attachShader(ubershader, vertex_shader);
  gl.attachShader(ubershader, fragment_shader);
  gl.linkProgram(ubershader);
  gl.useProgram(ubershader);

  // Attribute registration
  ubershader.vertex = gl.getAttribLocation(ubershader, "vertex");
  gl.enableVertexAttribArray(ubershader.vertex);
  ubershader.color = gl.getAttribLocation(ubershader, "color");
  gl.enableVertexAttribArray(ubershader.color);

  // Uniform registration
  ubershader.p_matrix = gl.getUniformLocation(ubershader, "p_matrix");
  ubershader.mv_matrix = gl.getUniformLocation(ubershader, "mv_matrix");
}
