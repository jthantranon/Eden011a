	
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
	//var testDialog1 = new MEUI.TestGlass();
	var testNewSheet = new MEUI.NewSheet();
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
	MEUI.Wish('aSession','',function(data){
		// alert(JSON.stringify(data.pulse.content.user.name));
		// alert(data.);
	});
	
	
	
	MEUI.Wish('getStoredCensus','',function(data){
	// Example of how to check for current user's pixel before drawing it.
		if (typeof data['Pixel3'] === 'undefined'){
			alert('lost');
		} else {
			alert(JSON.stringify(data));
		}
		
		// alert(JSON.stringify(data['Pixel1'].loc));
		// alert(JSON.stringify(data['Pixel1'].loc));
	});
	
	MEUI.Wish('getCensus','',function(data){
	// moved all avatar making stuff in here as we need to look up the avatar's location before drawing it
		// alert(JSON.stringify(data[1].loc.y));
		// var avatarProps = { location: new THREE.Vector3(1,2,1), camera: CITY.camera, isMyAvatar: true};
		var avatarProps = { location: new THREE.Vector3(data[1].loc.x,data[1].loc.y,data[1].loc.z), camera: CITY.camera, isMyAvatar: true};
		var userAvatar = new ME3D.Avatar(avatarProps);
		var avatarBounds = userAvatar.getBoundingBox();
		
		var avatarController = PHYSICS.addMassBody(userAvatar,avatarBounds,3);	
		
		CITY.scene.add(userAvatar);
		// NPCs //
		//////////
		var meNPC = new ME3D.NPC({ location: new THREE.Vector3(1,.5,1), camera: CITY.camera});
		CITY.scene.add(meNPC);
		
		
		
	 	
	 	// PICKING!! //
		///////////////
		var PICKER = new ME3D.Picker(CITY.scene, CITY.camera);
		
		PICKER.addClick(userAvatar);
		PICKER.addClick(meNPC);
			
			
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
		
			
		var animLoop = function() {
			runPhysics();
			ME3D.LERP.update();	//not working
		}
		
		
		RENDERER.queueRender(renderLoop,'');
		RENDERER.queueAnimation(animLoop,'');
		POPULATION = new ME3D.Population(CITY.scene,PICKER,userAvatar,CITY.camera);
		// alert(data.);
	});
	
	// var avatarProps = { location: new THREE.Vector3(1,2,1), camera: CITY.camera, isMyAvatar: true};
	// var userAvatar = new ME3D.Avatar(avatarProps);
	// var avatarBounds = userAvatar.getBoundingBox();
// 	
	// var avatarController = PHYSICS.addMassBody(userAvatar,avatarBounds,3);	
// 	
	// CITY.scene.add(userAvatar);
// 	
	// // NPCs //
	// //////////
	// var meNPC = new ME3D.NPC({ location: new THREE.Vector3(1,.5,1), camera: CITY.camera});
	// CITY.scene.add(meNPC);
// 	
// 	
// 	
//  	
 	// // PICKING!! //
	// ///////////////
	// var PICKER = new ME3D.Picker(CITY.scene, CITY.camera);
// 	
	// PICKER.addClick(userAvatar);
	// PICKER.addClick(meNPC);
// 		
// 		
	// // CONTROLS //	
	// //////////////
	// var controlsA = new ME3D.AvatarControls(avatarController,'', userAvatar);
// 	
	// // RENDERER //
	// //////////////
	// var renderLoop = function() {
		// var delta = CLOCK.getDelta();
	    // controlsA.update( delta );
	    // CITY.camera.position.x = userAvatar.getChildPosition('cameraTarget').x;
	    // CITY.camera.position.y = userAvatar.getChildPosition('cameraTarget').y;
	    // CITY.camera.position.z = userAvatar.getChildPosition('cameraTarget').z;
// 	    
	    // // PICKER.pick();
	    // // PICKER.pickBuilding();
	    // //showAvatarLoc();	  
	    // //myTransitions.fadeOut(delta);
	    // ME3D.Ticker.run();
	    // PICKER.resolve(); 
	// }
// 	
// 		
	// var animLoop = function() {
		// runPhysics();
		// ME3D.LERP.update();	//not working
	// }
// 	
// 	
	// RENDERER.queueRender(renderLoop,'');
	// RENDERER.queueAnimation(animLoop,'');
	// POPULATION = new ME3D.Population(CITY.scene,PICKER,userAvatar,CITY.camera);
	
	
}
        
