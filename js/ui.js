function addEventListeners(canvas) {
  canvas.setAttribute("tabindex", 0);
  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);
  canvas.addEventListener('contextmenu', function(evt) {
      evt.preventDefault();
    }, false);
}

function onMouseDown(event) {
  event.preventDefault();
  if (event.which === 1) {
    ui.click = event.which;
    ui.cursor_coords = [+event.pageX, +event.pageY];
  }
  if (event.which === 3) {
    ui.click = event.which;
    ui.cursor_coords = [+event.pageX, +event.pageY];
  }
}

function onMouseMove(event) {
  if (ui.click === 1) {
    var dx = +event.pageX - +ui.cursor_coords[0];
    var dy = +event.pageY - +ui.cursor_coords[1];
    ui.cursor_coords = [+event.pageX, +event.pageY];
    cam.rotation[0] += look_speed * dx;
    cam.rotation[1] -= look_speed * dy;
    cam.direction = [Math.cos(cam.rotation[1]) * Math.sin(cam.rotation[0]), Math.cos(cam.rotation[1]) * Math.cos(cam.rotation[0]), Math.sin(cam.rotation[1])];
  }
}

function onMouseUp(event) {
  ui.click = 0;
}

function onKeyDown(event) {
  switch(event.keyCode) {
    case 187: // +
      break;
    case 189: // -
      break;
    case 87: // w
      ui.keys |= 1 << MovementKeys.W_KEY;
      break;
    case 65: // a
      ui.keys |= 1 << MovementKeys.A_KEY;
      break;
    case 83: // s
      ui.keys |= 1 << MovementKeys.S_KEY;
      break;
    case 68: // d
      ui.keys |= 1 << MovementKeys.D_KEY;
      break;
    case 32: // space
      ui.keys |= 1 << MovementKeys.SPACE;
      break;
    case 67: // c
      ui.keys |= 1 << MovementKeys.C_KEY;
      break;
    case 81: // q
      ui.keys |= 1 << MovementKeys.Q_KEY;
      break;
    case 69: // e
      ui.keys |= 1 << MovementKeys.E_KEY;
      break;
  }
}

function onKeyUp(event) {
  switch(event.keyCode) {
    case 87: // w
      ui.keys &= ~(1 << MovementKeys.W_KEY);
      break;
    case 65: // a
      ui.keys &= ~(1 << MovementKeys.A_KEY);
      break;
    case 83: // s
      ui.keys &= ~(1 << MovementKeys.S_KEY);
      break;
    case 68: // d
      ui.keys &= ~(1 << MovementKeys.D_KEY);
      break;
    case 32: // space
      ui.keys &= ~(1 << MovementKeys.SPACE);
      break;
    case 67: // c
      ui.keys &= ~(1 << MovementKeys.C_KEY);
      break;
    case 81: // q
      ui.keys &= ~(1 << MovementKeys.Q_KEY);
      break;
    case 69: // e
      ui.keys &= ~(1 << MovementKeys.E_KEY);
      break;
  }
}
