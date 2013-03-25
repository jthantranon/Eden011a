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
	var testDialog1 = new MEUI.TestGlass();
	// var testDialog2 = new MEUI.DialogChat();
	// var dialog = ['<p>Lorem ipsum dolar sit amet.</p>', '<p>This is the way to the end of the road.</p>', '<p>Join me, and together we can rule the galaxy as father and son!</p>']
	// 	
	// var testDialog3 = new MEUI.DialogPaged({content:dialog});
	
	
		
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
	
	
	// PLAYER AVATAR //
	///////////////////
	var avatarProps = { location: new THREE.Vector3(1,2,1), camera: CITY.camera };
	var userAvatar = new ME3D.Avatar(avatarProps);
	var avatarBounds = userAvatar.getBoundingBox();
	
	var avatarController = PHYSICS.addMassBody(userAvatar,avatarBounds,3);	
	
	CITY.scene.add(userAvatar);
	
 	
 	// PICKING!! //
	///////////////
	var PICKER = new ME3D.Picker(CITY.scene, CITY.camera);
	
	PICKER.addClick(userAvatar);
		
		
	// CONTROLS //	
	//////////////
	var controlsA = new ME3D.AvatarControls(avatarController,'', userAvatar);
	
	// RENDERER //
	//////////////
	var renderLoop = function() {
		var delta = CLOCK.getDelta();
	    controlsA.update( delta );
	    CITY.camera.position.x = userAvatar.getChildPosition('cameraTarget').x;
	    CITY.camera.position.y = userAvatar.getChildPosition('cameraTarget').y;
	    CITY.camera.position.z = userAvatar.getChildPosition('cameraTarget').z;
	    
	    // PICKER.pick();
	    // PICKER.pickBuilding();
	    //showAvatarLoc();	  
	    //myTransitions.fadeOut(delta);
	    ME3D.Ticker.run();
	    PICKER.resolve(); 
	}
	
	RENDERER.queueRender(renderLoop,'');
	RENDERER.queueAnimation(runPhysics,'');
	
	}
    
	}); //end    

});