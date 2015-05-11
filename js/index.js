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
        camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10, 1000 );
        // camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        // Default camera position.
        camera.position.x = 3;
        camera.position.y = 3;
        camera.position.z = 5;

        // Declare the controls. For 3d, orbit controls are the most ubiquitous scheme. TODO: Maybe handle 2d data by forcing into a separate type of controls.
        controls = new THREE.OrbitControls( camera );
        // Some control config, lots more can be done here. https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js
        controls.damping = 0.02;


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

          var min = 0,
              max = 0;

  				for ( var i = 0; i < jsonResponse.length; i++ ) {
  					var material = new THREE.SpriteCanvasMaterial( {
  						color: jsonResponse[i].col || Math.random() * 0x808008 + 0x808080,
  						program: program
  					} );
  					particle = new THREE.Sprite( material );
  					particle.position.x = Number(jsonResponse[i].x);//Math.random() * 2000 - 1000;
  					particle.position.y = Number(jsonResponse[i].y);
  					particle.position.z = Number(jsonResponse[i].z);
  					particle.scale.x = particle.scale.y = 1;

            var big = Math.max(particle.position.x, particle.position.y, particle.position.z);
            var small = Math.min(particle.position.x, particle.position.y, particle.position.z);

            if (max < big) {
              max = big;
            }
            // TODO: incorporate negative axes
            if (min < small) {
              min = small;
            }

  					group.add( particle );
  				}

          // Make three lines for axes for now. R,G,B corresponds to X,Y,Z. The coloring is mainly for debugging.
          var axes = [];
          for (var i = 0; i < 3; i ++) {
            axes.push(new THREE.Geometry());
            axes[i].vertices.push(new THREE.Vector3(0, 0, 0));
          }

          // TODO: add tickmarks and labels.
          // X axis
          axes[0].vertices.push(new THREE.Vector3(max * 1.2, 0, 0));
          var xAxis = new THREE.Line(axes[0], new THREE.LineBasicMaterial({color:0xff0000}));

          // Y axis
          axes[1].vertices.push(new THREE.Vector3(0, max * 1.2, 0));
          var yAxis = new THREE.Line(axes[1], new THREE.LineBasicMaterial({color:0x00ff00}));

          // Z axis
          axes[2].vertices.push(new THREE.Vector3(0, 0, max * 1.2));
          var zAxis = new THREE.Line(axes[2], new THREE.LineBasicMaterial({color:0x0000ff}));

          scene.add(xAxis);
          scene.add(yAxis);
          scene.add(zAxis);

  				renderer = new THREE.CanvasRenderer();
  				renderer.setPixelRatio( window.devicePixelRatio );
  				renderer.setSize( window.innerWidth, window.innerHeight );
  				container.appendChild( renderer.domElement );

        }

        var dataOptions = ['data/2dimensions-1.json', 'data/2dimensions-2.json', 'data/3dimensions-1.json', 'data/3dimensions-2.json', 'data/3dimensions-3.json'];
        var whichDataset = window.location.href.split('?')[1] || 2; // Defaults to the first 3D dataset if no queryParam.


        getRequest(dataOptions[whichDataset], dataHandler);


        // These wire up some of the stock events. Keeping them around in case we need to do something with them.
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
