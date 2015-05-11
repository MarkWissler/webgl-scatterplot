// // Make a scene. Every object (points, lines, and so on) will be added to this scene.
// var scene = new THREE.Scene();
//
// // The camera is the object that'll be responsible for converting from the clipspace into screen coordinates, as well as handling movement events.
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//
// // The renderer abstracts a ton of the render logic from us. We make limited calls to it.
// var renderer = new THREE.WebGLRenderer();
//
// // TODO: Make the size responsive and base it on the visualization container
// renderer.setSize( window.innerWidth, window.innerHeight );
//
// // TODO: Instead of a statically defined insertion to the body, take an argument during initialization for where we're going to insert the render canvas.
// document.body.appendChild( renderer.domElement );
//
// // Default camera position.
// camera.position.x = 1;
// camera.position.y = 3;
// camera.position.z = 5;
//
// // Declare the controls. For 3d, orbit controls are the most ubiquitous scheme. TODO: Maybe handle 2d data by forcing into a separate type of controls.
// controls = new THREE.OrbitControls( camera );
// // Some control config, lots more can be done here. https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js
// controls.damping = 0.2;
//
// // The render loop. Uses rAF, which is an absolute must for anything involving WebGL. More here: http://learningwebgl.com/blog/?p=3189
// var render = function () {
//   requestAnimationFrame( render );
//   renderer.render(scene, camera);
// };
//
// // It might make sense to use an IIFE for the renderloop, but this is how most ThreeJS examples invoke the renderer.
// render();
//
// // Purely for debugging/demo/proof-of-concept. I list our demo datasets here, grab a query param from the url and render that dataset.
// var dataOptions = ['data/2dimensions-1.json', 'data/2dimensions-2.json', 'data/3dimensions-1.json', 'data/3dimensions-2.json', 'data/3dimensions-3.json'];
// var whichDataset = window.location.href.split('?')[1] || 2; // Defaults to the first 3D dataset if no queryParam.
//
// // This is a callback that'll parse the data, construct the buffers, and add the dataset to the scene.
// var dataHandler = function (jsonResponse) {
//   // var PI2 = Math.PI * 2;
// 	//   var program = function ( context ) {
// 	// 		context.beginPath();
// 	// 		context.arc( 0, 0, 0.5, 0, PI2, true );
// 	// 		context.fill();
// 	// 	}
//   //
// 	// 	group = new THREE.Group();
// 	// 	scene.add( group );
//   //
// 	// 	for ( var i = 0, leni = jsonResponse.length; i < leni; i++ ) {
//   //
// 	// 		var material = new THREE.SpriteCanvasMaterial( {
// 	// 			color: Math.random() * 0x808008 + 0x808080,
// 	// 			program: program
// 	// 		} );
//   //
// 	// 		particle = new THREE.Sprite( material );
// 	// 		particle.position.x = jsonResponse[i].x;
// 	// 		particle.position.y = jsonResponse[i].y;
// 	// 		particle.position.z = jsonResponse[i].z;
// 	// 		particle.scale.x = particle.scale.y = Math.random() * 20 + 10;
// 	// 		group.add( particle );
// 	// 	}
//   				// var PI2 = Math.PI * 2;
//   				// var program = function ( context ) {
//           //
//   				// 	context.beginPath();
//   				// 	context.arc( 0, 0, 0.5, 0, PI2, true );
//   				// 	context.fill();
//           //
//   				// }
//           //
//   				// group = new THREE.Group();
//   				// scene.add( group );
//           //
//   				// for ( var i = 0; i < 1000; i++ ) {
//           //
//   				// 	var material = new THREE.SpriteCanvasMaterial( {
//   				// 		color: Math.random() * 0x808008 + 0x808080,
//   				// 		program: program
//   				// 	} );
//           //
//   				// 	particle = new THREE.Sprite( material );
//   				// 	particle.position.x = Math.random() * 2000 - 1000;
//   				// 	particle.position.y = Math.random() * 2000 - 1000;
//   				// 	particle.position.z = Math.random() * 2000 - 1000;
//   				// 	particle.scale.x = particle.scale.y = Math.random() * 20 + 10;
//   				// 	group.add( particle );
//   				// }
//
//
//   // // Three has a built in particle system object. TODO: add point ids, add some logic to color subsets of the particle system based on id.
//   // var pc = new THREE.PointCloud(pcGeometry, basic);
//   // scene.add(pc);
// };
//

//

var container, stats;
			var camera, scene, renderer, group, particle;
			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        // Default camera position.
        camera.position.x = 1;
        camera.position.y = 3;
        camera.position.z = 5;

        // Declare the controls. For 3d, orbit controls are the most ubiquitous scheme. TODO: Maybe handle 2d data by forcing into a separate type of controls.
        controls = new THREE.OrbitControls( camera );
        // Some control config, lots more can be done here. https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js
        controls.damping = 0.2;


				scene = new THREE.Scene();

        function dataHandler(jsonResponse) {
          var PI2 = Math.PI * 2;
  				var program = function ( context ) {

  					context.beginPath();
  					context.arc( 0, 0, 0.5, 0, PI2, true );
  					context.fill();

  				}

  				group = new THREE.Group();
  				scene.add( group );

  				for ( var i = 0; i < jsonResponse.length; i++ ) {

  					var material = new THREE.SpriteCanvasMaterial( {
  						color: Math.random() * 0x808008 + 0x808080,
  						program: program
  					} );
  					particle = new THREE.Sprite( material );
  					particle.position.x = Number(jsonResponse[i].x);//Math.random() * 2000 - 1000;
            console.log(typeof particle.position.x);
  					particle.position.y = Number(jsonResponse[i].y);
  					particle.position.z = Number(jsonResponse[i].z);
  					particle.scale.x = particle.scale.y = 1;
  					group.add( particle );
  				}

  				renderer = new THREE.CanvasRenderer();
  				renderer.setPixelRatio( window.devicePixelRatio );
  				renderer.setSize( window.innerWidth, window.innerHeight );
  				container.appendChild( renderer.domElement );

        }

        var dataOptions = ['data/2dimensions-1.json', 'data/2dimensions-2.json', 'data/3dimensions-1.json', 'data/3dimensions-2.json', 'data/3dimensions-3.json'];
        var whichDataset = window.location.href.split('?')[1] || 2; // Defaults to the first 3D dataset if no queryParam.


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

        //
				// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				// document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				// document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				window.addEventListener( 'resize', onWindowResize, false );
			}

			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function onDocumentMouseMove( event ) {
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			function onDocumentTouchStart( event ) {
				if ( event.touches.length === 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}

			function onDocumentTouchMove( event ) {
				if ( event.touches.length === 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}

			function animate() {
				requestAnimationFrame( animate );
				render();
			}

			function render() {
				renderer.render( scene, camera );
			}
