$.when(
    $.getScript( "/_ah/channel/jsapi"),
    // $.getScript( "js/me3d.js"),
    // $.getScript( "js/meui.js"),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(goog){
	
	console.log('GOOGLE CHANNEL = LOADED');
	
	$.when(
	    $.getScript( "js/meui/meui.channel.js"),
	    $.getScript( "js/meui/meui.chatbox.js"),
	    // $.getScript( "js/meui/meui.glass.js"),
	    // $.getScript( "js/UIControl.js"),
	    // $.getScript( "js/me3d/me3d.interactions.js"),
	    // $.getScript( "js/me3d/me3d.entity.js"),
	    // $.getScript( "js/me3d/me3d.system.js"),
	    // $.getScript( "js/me3d/me3d.scene.js"),
	    // $.getScript( "js/me3d/me3d.physics.js"),
	    // $.getScript( "js/me3d/me3d.population.js"),
	    // $.getScript( "js/me3d/me3d.emitter.js"),
	    // $.getScript( "js/me3d/me3d.sparks.js"),
	    // $.getScript( "js/me3d/me3d.picker.js"),
	    // $.getScript( "js/me3d/me3d.bounds.js"),
	    // $.getScript( "js/me3d/me3d.stage.js"),
	    // $.getScript( "js/me3d/me3d.grid.js"),
	    // $.getScript( "js/me3d/me3d.stage.js"),
	    // $.getScript( "js/me3d/me3d.avatar.js"),
	    // $.getScript( "js/me3d/me3d.testcube.js"),
	    // $.getScript( "js/me3d/me3d.avatarmover.js"),
	    // $.getScript( "js/me3d/me3d.builder.js"),
	    // $.getScript( "js/me3d/me3d.controls.js"),
	    // $.getScript( "js/me3d/me3d.transitions.js"),
	    // $.getScript( "js/me3d/me3d.render.js"),
	    // $.getScript( "js/me3d/me3d.world.js"),    
// 	    
	    $.Deferred(function( deferred ){
	        $( deferred.resolve );
	    })
	).done(function(goog){
		
	console.log('MAIN EXECUTION');
		

	// disabled splash
    $('#splash').hide();
	/* 
	 * start world which includes: default scenes for city,
	 * zone(interior), and map, renderer, and physics;
	 * 
	 * methods for initializing and switching scenes;
	 * 
	 * will be expanded to include managers/observers;
	 */
	
	// shortcut to preloader in me3d.js
	// assets are queued to load from their object file
	var PRELOADER = ME3D.Preloader;
	
	// load all of the queued assets and start main
	PRELOADER.load(main);
		
	// main execution
	function main() {
			
	var MEAPP = new ME3D.World();
	//var MEHUD = new ME3D.Hud(); // does nothing
	
	//MEAPP.preload();
	
	// INITIALIZE HUD!!! //
	///////////////////////
	var CHATBOX = new MEUI.ChatBox();
	var testDialog1 = new MEUI.Dialog();
	var testDialog2 = new MEUI.DialogChat();
	var dialog = ['<p>Lorem ipsum dolar sit amet.</p>', '<p>This is the way to the end of the road.</p>', '<p>Join me, and together we can rule the galaxy as father and son!</p>']
	
	var testDialog3 = new MEUI.DialogPaged({content:dialog});
	
	
		
	// LOCAL REFERENCES //
	//////////////////////
	var CITY = MEAPP.cityView,
		ZONE = MEAPP.zoneView,
		MAP = MEAPP.mapView,
		RENDERER = MEAPP.renderer,
		PHYSICS = MEAPP.physics,
		BOUNDS = MEAPP.bounds,
		EMITTER = MEAPP.emitter,
		CLOCK = MEAPP.clock;
		ELEMENT = RENDERER.element;
	
	
	
	// GLOBAL EVENT LISTENERS //
	////////////////////////////
	//ELEMENT.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	
	
	// INITIALIZE CITYVIEW ENVIRONMENT //
	/////////////////////////////////////
	var cityStage = new ME3D.Stage();
	var cityStageBounds = BOUNDS.getBoundsMax(cityStage.getBase());	
	
	CITY.scene.add(cityStage.getStage());
	PHYSICS.addCalcStiffBody(cityStage.getBase(),cityStageBounds);
	
	
	// INITIALIZE CITYVIEW GRID //
	//////////////////////////////
	var cityGrid = new ME3D.Grid(2,.5,11);
	var gridChildren = cityGrid.getChildren();

	// do physics for grid squares	
	for(var i=0,j=gridChildren.length; i<j; i++){
		var gridSquareBounds = BOUNDS.getBoundsMin(gridChildren[i]);
		PHYSICS.addMassBody(gridChildren[i],gridSquareBounds,0);		
	};
	
	CITY.scene.add(cityGrid.getGrid());
	
	// INITIALIZE AVATAR //
	///////////////////////
	var myAvatar = new ME3D.Avatar(new THREE.Vector3(1,1,1));
	CITY.scene.add(myAvatar.getAvatar());
	myAvatar.body.scale.set(.02,.02,.02);
	var myAvatarBounds = BOUNDS.getBoundsMax(myAvatar.getBoundsMesh());
	myAvatarBounds.multiplyScalar(1.8);
	var myAvatarController = PHYSICS.addMassBody(myAvatar.getAvatar(),myAvatarBounds,3);
	
	// INITIALIZE TEST PHYSICS CUBE //
	//////////////////////////////////
//	var cubeMap = THREE.ImageUtils.loadTexture("textures/boxStripe.gif");	
//	var testCube = new THREE.Mesh(
//		new THREE.CubeGeometry(1,1,1),
//		new THREE.MeshPhongMaterial({
//			map: cubeMap, emissive:0x007777,
//			opacity: .75, transparent:true,
//			side:THREE.DoubleSide}));
//	
//	testCube.useQuaternion = true;
//	var quaternion = new THREE.Quaternion();
//	quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), ME3D.de2ra(-45) );
//    testCube.quaternion.copy(quaternion);
//   	testCube.position.y = 4;
//   	
//	var cubeBounds = BOUNDS.getBoundsMax(testCube);	
//	PHYSICS.addMassBody(testCube,cubeBounds,.1);
	
	var testCube = new ME3D.TestCube();
	testCube.useQuaternion = true;
	var cubeBounds = BOUNDS.getBoundsMax(testCube.getMesh());	
	//PHYSICS.addMassBody(testCube,cubeBounds,.1);
	
	CITY.scene.add(testCube);
	
	// BUILDINGS!! //
	/////////////////
	//myBuilder = new ME3D.Builder(myWorld.scene, myPhysics);
 	//myBuilder.makeBuilding(4, new THREE.Vector3(1,1,1), new THREE.Vector3(-2.5,0,0), 'City Hall');
 	
 	// PICKING!! //
	///////////////
	var PICKER = new ME3D.Picker(CITY.scene, CITY.camera);
		
		
	// CONTROLS //	
	//////////////
	var controlsA = new ME3D.AvatarControls(myAvatarController,'', myAvatar.avatar);
	
	// RENDERER //
	//////////////
	var renderLoop = function() {
		var delta = CLOCK.getDelta();
	    controlsA.update( delta );
	    CITY.camera.position.x = myAvatar.avatar.getChildPosition('cameraTarget').x;
	    CITY.camera.position.y = myAvatar.avatar.getChildPosition('cameraTarget').y;
	    CITY.camera.position.z = myAvatar.avatar.getChildPosition('cameraTarget').z;
	    
	    PICKER.pick();
	    PICKER.pickBuilding();
	    //showAvatarLoc();	  
	    //myTransitions.fadeOut(delta);
	    ME3D.Ticker.run(); 
	}
	
	RENDERER.queueRender(renderLoop,'');
	RENDERER.queueAnimation(runPhysics,'');
	
	}
    
	}); //end    

});