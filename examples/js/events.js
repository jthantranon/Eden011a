$(document).ready(function(){
	
	
	// REFERENCES //
	////////////////
	//var SCENE, RENDERER, CLOCK = new THREE.Clock();
	
	// SCENE //
	///////////
	var width = $(window).width(), 
		height = $(window).height(),
		clock = new THREE.Clock();
	
	var viewAngle = 60,
		aspect = width/height,
		near = 0.1,
		far = 1000;
		
	SCENE = new THREE.Scene();
	
	CAMERA = new THREE.PerspectiveCamera(
		viewAngle, aspect, near, far);
		
	CAMERA.position.set(5,3,5);
	CAMERA.lookAt(new THREE.Vector3(0,0,0));
					
	SCENE.add(self.camera);
		
	LIGHT = new THREE.PointLight( 0xFFFFFF, 1, 10 );
	LIGHT.position.set( 0, 3, 0);
	
	SCENE.add( self.LIGHT );
	
	// RENDERER //
	//////////////
	RENDERER = new THREE.WebGLRenderer();
	PICKER = new ME3D.Picker(SCENE,CAMERA);
	
	RENDERER.setSize( width, height );
	console.log(document.body);
	$('body').append( RENDERER.domElement );
	
	animationQueue = [];
	renderQueue = [];
	
	var renderLoop = function() {
		//var delta = new THREE.Clock.getDelta();
			
	}
	
	var animLoop = function() {
		//var delta = new THREE.Clock.getDelta();
		
	}
	
	function _animate() {
		
		requestAnimationFrame(_animate);
				
		// resolve queue
		for(var i=0,j=animationQueue.length; i<j; i++){
			
	  		if(typeof animationQueue[i][1] === 'undefined') {
				animationQueue[i][0]();
			} else {
				animationQueue[i][0](animationQueue[i][1]);
			}
		};
		
		_render();
		//stats.update();
	}
		
	function _render() {    
	    
	    // resolve ticks
	    // for(var i=0,j=ME3D.tickList.length; i<j; i++){
// 			
			// if(typeof renderQueue[i][1] === 'undefined') {
				// renderQueue[i][0]();
			// } else {
				// renderQueue[i][0](renderQueue[i][1]);
			// }
		// };	    
	    
	    
	    // resolve queue
		// for(var i=0,j=renderQueue.length; i<j; i++){
// 			
			// if(typeof renderQueue[i][1] === 'undefined') {
				// renderQueue[i][0]();
			// } else {
				// renderQueue[i][0](renderQueue[i][1]);
			// }
		// };
		PICKER.resolve()
	    RENDERER.render(SCENE, CAMERA);
	}
	
	
	surrogate = function() {};
    extend = function (base,sub) {
		// Copy the prototype from the base to setup inheritance
	    surrogate.prototype = base.prototype;
	    // Tricky huh?
	    sub.prototype = new surrogate();
	    // Remember the constructor property was set wrong, let's fix it
	    sub.prototype.constructor = sub;
	}
	
	
	/////////////////////////////////////////////////////////////////
	//
	//  YOUR CODE STARTS HERE ///////////////////////////////////////
	//
	/////////////////////////////////////////////////////////////////
	RENDERER.setClearColor(new THREE.Color(0xFFEDED),1);
	
	console.log(this);
	
	var testCube = new THREE.Mesh(
		new THREE.SphereGeometry(1,10,10),
		new THREE.MeshNormalMaterial()
	);
	
	testCube.position.x = 1;
	testCube.doClick = function() {
		alert('You clicked front ball!');
	}
	
	testCube.doMouseEnter = function() {
		console.log('mouseenter on front sphere!');
	}
	
	testCube.doMouseLeave = function() {
		console.log('mouseleave on front sphere');
	}
	
	
	SCENE.add(testCube);
	
	
	
	AVATAR = function() {
		var self = this;
		
		THREE.Object3D.call(this);
		ACTIONS.call(this);
		
		this.presence = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshNormalMaterial()
		);
		
		this.doClick = function() {
			alert('You clicked back ball!');
		}
		
		
		this.container = new THREE.Object3D();
		
		this.container.add(this.presence);
		this.add(this.container);
		console.log(this);
		return this;
	}
	
	ACTIONS = function() {
		
		this.doMouseEnter = function() {
			console.log("mouse inside");
		}
		
		
		this.doMouseLeave = function() {
			console.log("mouse left");
		}
	}
	
	extend(THREE.Object3D, AVATAR);
	
	myAvatar = new AVATAR();
	SCENE.add(myAvatar);
	
	PICKER.addClick(testCube);
	PICKER.addClick(myAvatar);
	
	//renderQueue.push(PICKER.resolve());
	
	
	
	/////////////////////////////////////////////////////////////////
	//
	//  END OF YOUR CODE  ///////////////////////////////////////////
	//
	/////////////////////////////////////////////////////////////////

	_animate();
	
	
	
	
	
	
});

