/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Yep, its a test cube...
 */

// TODO: Y U NO DO THINGS???!?!?!?!

ME3D.TestCube = function (props) {
	
	// inheritance //
	/////////////////
	THREE.Object3D.call(this);
	ME3D.Entity.call(this);
	this.init(); // call from entity
	
	// default paramaters //
	////////////////////////
	this.options = {
		
	}
	
	if (typeof props !== 'undefined') MEUI.merge(options, props);
	
	// object properties //
	///////////////////////
	this.name = 'testCube';
	
	
	// private properties //
	///////////////////////
	var cubeMap = THREE.ImageUtils.loadTexture("textures/boxStripe.gif");	
	var testCube = new THREE.Mesh(
		new THREE.CubeGeometry(1,1,1),
		new THREE.MeshPhongMaterial({
			map: cubeMap, emissive:0x007777,
			opacity: .75, transparent:true,
			side:THREE.DoubleSide}));
	
	testCube.useQuaternion = true;
	var quaternion = new THREE.Quaternion();
	quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), ME3D.de2ra(-45) );
    testCube.quaternion.copy(quaternion);
   	testCube.position.y = 4;
   	testCube.name = 'cubeMesh';
   	this.add(testCube);
	
	
	// private methods //
	/////////////////////
	
   	
		
	/******************* 
	 *  EVENT BINDINGS  
	 *******************/
	
   	console.log(this);
};


/*
 * API
 */

// no prototype inheritance
//ME3D.TestCube.prototype = {
//		
//	constructor: ME3D.TestCube,
//	
//	log: function() {
//		console.log(this);
//	},
//	
//	getMesh: function() {
//		return this.testCube;
//	}
//
//};

	/*
	 * API - PROTOTYPE INHERITANCE
	 */
	
	ME3D.extend(THREE.Object3D, ME3D.TestCube);
	
	// prototype inheritance
	ME3D.TestCube.prototype.constructor = ME3D.TestCube;
	
	ME3D.TestCube.prototype.log = function() {
		console.log(this);
	}
	
	ME3D.TestCube.prototype.getMesh = function() {
		return this.getChildByName('cubeMesh');
	}

/*
 * ASSETS
 */

//ME3D.Preloader.add('url/to-asset.json', 'uniqueHandle');