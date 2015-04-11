console.log("js/index.js loaded");

var scene = new THREE.Scene(),
  // We may want an orthographic camera for the 3d stuff.
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
  renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

// bleh. This is from the ThreeJS docs.
document.body.appendChild( renderer.domElement );


var jsonBlob = 
