// Make a scene. Every object (points, lines, and so on) will be added to this scene.
var scene = new THREE.Scene();

// The camera is the object that'll be responsible for converting from the clipspace into screen coordinates, as well as handling movement events.
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// The renderer abstracts a ton of the render logic from us. We make limited calls to it.
var renderer = new THREE.WebGLRenderer();

// TODO: Make the size responsive and base it on the visualization container
renderer.setSize( window.innerWidth, window.innerHeight );

// TODO: Instead of a statically defined insertion to the body, take an argument during initialization for where we're going to insert the render canvas.
document.body.appendChild( renderer.domElement );

// Default camera position.
camera.position.x = 1;
camera.position.y = 3;
camera.position.z = 5;

// Declare the controls. For 3d, orbit controls are the most ubiquitous scheme. TODO: Maybe handle 2d data by forcing into a separate type of controls.
controls = new THREE.OrbitControls( camera );
// Some control config, lots more can be done here. https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js
controls.damping = 0.2;

// The render loop. Uses rAF, which is an absolute must for anything involving WebGL. More here: http://learningwebgl.com/blog/?p=3189
var render = function () {
  requestAnimationFrame( render );
  renderer.render(scene, camera);
};

// It might make sense to use an IIFE for the renderloop, but this is how most ThreeJS examples invoke the renderer.
render();

// Purely for debugging/demo/proof-of-concept. I list our demo datasets here, grab a query param from the url and render that dataset.
var dataOptions = ['data/2dimensions-1.json', 'data/2dimensions-2.json', 'data/3dimensions-1.json', 'data/3dimensions-2.json', 'data/3dimensions-3.json'];
var whichDataset = window.location.href.split('?')[1] || 2; // Defaults to the first 3D dataset if no queryParam.

// This is a callback that'll parse the data, construct the buffers, and add the dataset to the scene.
var dataHandler = function (jsonResponse) {
  var pcGeometry = new THREE.Geometry();

  // TODO: We should probably set a flag here to check for 2D vs 3D and do some sort of environment switching.
  for (var i = 0, leni = jsonResponse.length; i < leni; i++) {
    pcGeometry.vertices.push(new THREE.Vector3(jsonResponse[i].x, jsonResponse[i].y, jsonResponse[i].z || 0));
  }

  // Three has a built in particle system object. TODO: add point ids, add some logic to color subsets of the particle system based on id.
  var pc = new THREE.PointCloud(pcGeometry);
  scene.add(pc);
};

getRequest(dataOptions[whichDataset], dataHandler);

// Make three lines for axes for now. R,G,B corresponds to X,Y,Z. The coloring is mainly for debugging.
var axes = [];
for (var i = 0; i < 3; i ++) {
  axes.push(new THREE.Geometry());
  axes[i].vertices.push(new THREE.Vector3(0, 0, 0));
}

// TODO: scale the axes based on the data range.
// TODO: add tickmarks and labels.
// X axis
axes[0].vertices.push(new THREE.Vector3(100, 0, 0));
var xAxis = new THREE.Line(axes[0], new THREE.LineBasicMaterial({color:0xff0000}));

// Y axis
axes[1].vertices.push(new THREE.Vector3(0, 100, 0));
var yAxis = new THREE.Line(axes[1], new THREE.LineBasicMaterial({color:0x00ff00}));

// Z axis
axes[2].vertices.push(new THREE.Vector3(0, 0, 100));
var zAxis = new THREE.Line(axes[2], new THREE.LineBasicMaterial({color:0x0000ff}));

scene.add(xAxis);
scene.add(yAxis);
scene.add(zAxis);
