/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.1
 * Currently creates a generic npc model and effects for MetaEden.
 */

// TODO: default parameters and arguments
// TODO: evolve avatar design


ME3D.NPC = function (props) {
	
	var self = this;
	//alert('npc');

	THREE.Object3D.call(this);		
	ME3D.Entity.call(this);
	this.init();
	this.presence = new THREE.Object3D();
	this.menu = false;
	
	// DEFAULT PROPERTIES //
	////////////////////////
	this.options = {
		location: new THREE.Vector3(0,0,0),
		script:'',
		name:'Generic NPC'
	}
	
	if (typeof props !== 'undefined') MEUI.merge(this.options, props);
	
	
	// OBJECT PROPERTIES //
	///////////////////////
	this.location = this.options.location;
	this.camera = this.options.camera;
	// this.tooltip = false;
	// this.menu = false;
	this.name = this.options.name;
	// this.isMyAvatar = this.options.isMyAvatar;
	// this.locUpdateRate = 50;
	
	
	this.addNameplate = function(plateName) {
		var canvas = document.createElement('canvas');
		var size = 250;
		canvas.width = size;
		canvas.height = size;
		var context = canvas.getContext('2d');
		context.textAlign = 'center';
		context.font = '18px Tahoma';
		context.fillStyle = "#00FFFF";
		context.fillText(plateName, size/2, size/2 );
		
		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		var sprite = new THREE.Sprite(new THREE.SpriteMaterial({
	    	map: texture,
	    	transparent: true,
	    	useScreenCoordinates: false
	  	}));
	  	
	  	sprite.position.y = .35;
	  	self.add(sprite);
	}
	
		
			
	// BODY/PRESENCE MESH //
	////////////////////////
	
	var body = new THREE.Mesh();
	body.geometry = new THREE.SphereGeometry(.2,4,2);
	body.material = new THREE.MeshNormalMaterial();
	
	this.presence.add(body);
	
		
	// // BODY/PRESENCE PARTICLES //
	// /////////////////////////////
// 	
// 		
// 	
	// // CAMERA HELPERS //
	// ////////////////////
// 
// 	
	// // PRIVATE METHODS //
	// /////////////////////
	// this.delayBindings = function() {
		// var self = this;
		// var t = setTimeout(function(){
			// //self.doMouseEnter = self.doMouseEnterDelayed;
			// //self.doMouseLeave = self.doMouseLeaveDelayed;
		// },self.locUpdateRate);
	// }
// 
// 
	// EVENT BINDINGS/HANDLERS //
	/////////////////////////////
	this.tick = function(delta) {
		this.presence.rotation.y += ME3D.de2ra(.5);
		//var loc = ME3D.toScreenXY(this.position.clone(), this.camera, $('body'));
		
		if(self.menu != false) {
			// alert('wtf');
			var locale = new THREE.Vector3();
			locale.copy(self.position);
			var coords = this.toScreenXY(locale, self.camera, $('body'));
			this.menu.updateLocation(coords);
		}
		
								
	} //// end tick ////
	
	this.doClick = function(mouse) {
		//alert('STAHPIT!!! ' + mouse.x + ',' + mouse.y);
		var action1 = function(){ alert('Menu Alert!'); };
		var action2 = function(){ new MEUI.DialogPlayer(
									{ messages: ['NPC\'s built this city...',
						  						 'on Rock & Roll!']}); };
						  						 
		var self = this.parent;
		if(!self.menu) {
			var props = { xpos: mouse.x, ypos: mouse.y-30,
						  actions: [
						  	['alert', action1],
						  	['talk', action2]
						  ]};
			self.menu = new MEUI.ContextMenu(props);
		} else {
			self.menu.updatePos(mouse.x-240,mouse.y-200);
			self.menu.fadeIn('fast');
		}
		
	};
// 	
	// this.nameplate = function() {
		
	// }
// 	
	// this.doMouseEnterDelayed = function(mouse) {
		// var self = this.parent;
// 		
		// var checkPOS = self.position.clone();	
		// var mousePOS = (self.toScreenXY(checkPOS, self.camera, $('body')));
// 				
		// if (!self.tooltip) {
			// var props = { xpos: mousePOS.x-100, ypos: mousePOS.y-100,
						  // message: 'Tooltip for the win!' };
// 						   
			// self.tooltip = new MEUI.Tooltip(props); 
		// } else {
			// self.tooltip.fadeIn();
		// }
// 		
		// //self.tooltip.updatePos(mousePOS.x-100,mousePOS.y-100);
// 		
	// };
// 	
	// this.doMouseLeaveDelayed = function(mouse) {
		// var self = this.parent;
		// if (self.tooltip) self.tooltip.fadeOut();		
	// };
		
		
	// INITIALIZE //
	////////////////
	//this.init();
	//this.delayBindings();
	this.addNameplate(self.name);
	
	this.useQuaternion = true;
	this.presence.dirtyVertices = true;
	
	//this.position.set(this.location);
	//this.presence.scale.set(.02,.02,.02);
	this.position.copy(this.location);
	this.add(this.presence);
	//alert('npc');
	return this;

};


/*
 * API
 */

ME3D.extend(THREE.Object3D, ME3D.NPC);
 
ME3D.NPC.prototype.constructor = ME3D.NPC;
// 
// ME3D.NPC.prototype.getBoundingBox = function() {
// 	
	// var bounds = new THREE.Geometry();
	// var models = this.presence.getDescendants();
// 	
	// for(var i=0,j=models.length; i<j; i++){
		// THREE.GeometryUtils.merge(bounds, models[i].geometry);
	// };
// 	
// 	
	// bounds.computeBoundingBox();
	// bounds.boundingBox.max.multiplyScalar(.02,.02,.02)
	// console.log(bounds.boundingBox);
	// return bounds.boundingBox.max;
// 
// };
// 
// ME3D.NPC.prototype.updateLoc = function(location, predicted, velocity) {
	// var self = this;
	// console.log(JSON.stringify(predicted));
	// console.log(JSON.stringify(location));
	// self.location.copy(location);	
// };

/*
 * ASSETS
 */


// ME3D.Preloader.add('models/me_avatar_fox_aura.json', 'meAvatarAura');
// ME3D.Preloader.add('models/me_avatar_fox_head.json', 'meAvatarHead');
// ME3D.Preloader.add('models/me_avatar_fox_body.json', 'meAvatarBody');
// ME3D.Preloader.add('models/me_avatar_fox_cape.json', 'meAvatarCape');
// ME3D.Preloader.add('models/me_avatar_fox_globe.json', 'meAvatarGlobe');
