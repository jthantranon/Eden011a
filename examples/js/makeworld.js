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
RENDERER.setSize( width, height );
console.log(document.body);
$('body').append( RENDERER.domElement );

var renderLoop = function() {
	//var delta = new THREE.Clock.getDelta();
	

}

var animLoop = function() {
	//var delta = new THREE.Clock.getDelta();

}


