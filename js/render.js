/**
 * The main render function. We use the standard requestAnimationFrame to call render on an array. We can manage what gets dropped into the array elsewhere.
 *
 */
function render() {
  // We use elapsed time to get scene changes (camera movement.)
  var elapsed = Date.now() - last_time;
  // Kick off the render loop.
  requestAnimationFrame(render);

  // Call some stats functions. These can be taken out. I'll probably put in an environment variable that can disable rStats.
  stats( 'frame' ).start();
  stats( 'rAF' ).tick();
  stats( 'FPS' ).frame();

  // If the shader program isn't yet running, return.
  if (!ubershader) {
    return;
  }

  // Draw a black background. We can change this by inserting variables into the clearColor function.
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // We enable the depth test so that we don't run into z-index issues.
  gl.enable(gl.DEPTH_TEST);
  // Establishes our aspect ratio.
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  // "Clearing the depth bit" is a graphics thing. This is basically just standard practice.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  stats( 'getscenechanges' ).start();
  // Update the camera position.
  getSceneChanges(elapsed);
  stats( 'getscenechanges' ).end();

  stats( 'setuniforms' ).start();
  // Update uniforms.
  setUniforms();
  stats( 'setuniforms' ).end();

  stats( 'render' ).start();
  // Renders the stuff inside the data array.
  renderData();
  stats( 'render' ).end();
  last_time = Date.now();
  stats( 'frame' ).end();
  stats().update();
}

/**
 * Updates the camera based on user input.
 *
 * @param {Number} elapsed The number of milliseconds since the last frame.
 */
function getSceneChanges(elapsed) {
  move_vec = [+0,+0,+0];

  if (ui.keys & (1 << MovementKeys.W_KEY)) { // w
    vec3.add(move_vec, move_vec, [move_speed * cam.direction[0] * elapsed, move_speed * cam.direction[1] * elapsed, move_speed * cam.direction[2] * elapsed]);
  } else if (ui.keys & (1 << MovementKeys.S_KEY)) { // s
    vec3.subtract(move_vec, move_vec, [move_speed * cam.direction[0] * elapsed, move_speed * cam.direction[1] * elapsed, move_speed * cam.direction[2] * elapsed]);
  }
  if (ui.keys & (1 << MovementKeys.A_KEY)) { // a
    vec3.add(move_vec, move_vec, [-move_speed * cam.direction[1] * elapsed, move_speed * cam.direction[0] * elapsed,0]);
  } else if (ui.keys & (1 << MovementKeys.D_KEY)) { // d
    vec3.subtract(move_vec, move_vec, [-move_speed * cam.direction[1] * elapsed, move_speed * cam.direction[0] * elapsed,0]);
  }
  if (ui.keys & (1 << MovementKeys.SPACE)) { // space
    move_vec[2] += move_speed * elapsed;
  } else if (ui.keys & (1 << MovementKeys.C_KEY)) { // c
    move_vec[2] -= move_speed * elapsed;
  }
  if (move_vec[0] > 0.0 || move_vec[1] > 0.0 || move_vec[2] > 0.0 ) {
    console.log(move_vec);
  }
  vec3.add(cam.position, cam.position, move_vec);

  mat4.lookAt(mv_matrix, cam.position, [cam.position[0] + cam.direction[0],cam.position[1] + cam.direction[1], cam.position[2] + cam.direction[2]], [0.0, 0.0, 1.0]);
}

/**
 * Sets the uniforms that are carried into the shader program. Stuff like point size, flags, and so on will be assigned here.
 */
function setUniforms() {
  gl.uniformMatrix4fv(ubershader.p_matrix, false, p_matrix);
  gl.uniformMatrix4fv(ubershader.mv_matrix, false, mv_matrix);
}

// Iterates over the data array and draws it.
function renderData() {
  for (i = 0; i < scatterData.length; i++) {
    gl.bindBuffer(gl.ARRAY_BUFFER, scatterData[i].vbo);
    gl.vertexAttribPointer(ubershader.vertex, 3, gl.UNSIGNED_SHORT, true, 6, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, scatterData[i].cbo);
    gl.vertexAttribPointer(ubershader.color,  3, gl.UNSIGNED_BYTE, true, 3, 0);
    gl.drawArrays(gl.POINTS, 0, scatterData[i].vertices.length / 3);
  }
}
