/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.2.0
 * Currently creates a generic avatar model and effects for MetaEden.
 */

// TODO: default parameters and arguments
// TODO: evolve avatar design


ME3D.Avatar = function (props) {
	
	var self = this;

	THREE.Object3D.call(this);		
	ME3D.Entity.call(this);
	
	// DEFAULT PROPERTIES //
	////////////////////////
	this.options = {
		location: new THREE.Vector3(0,0,0),
		isMyAvatar: false
	}
	
	if (typeof props !== 'undefined') MEUI.merge(this.options, props);
	
	
	// OBJECT PROPERTIES //
	///////////////////////
	this.location = this.options.location;
	this.camera = this.options.camera;
	this.tooltip = false;
	this.menu = false;
	this.name = this.options.name;
	this.isMyAvatar = this.options.isMyAvatar;
	
	this.presence = new THREE.Object3D(); // container for the body
	this.sparkles = new ME3D.Emitter();
	this.glowie = new THREE.ParticleSystem();
	
	
	// BODY/PRESENCE MESH //
	////////////////////////
	var assets = ME3D.Preloader.assets;
	var head, cape, aura, globe, torso;
	
	head = new THREE.Mesh(assets.meAvatarHead.geometry, assets.meAvatarHead.materials[0]);
	cape = new THREE.Mesh(assets.meAvatarCape.geometry, assets.meAvatarCape.materials[0]);
	aura = new THREE.Mesh(assets.meAvatarAura.geometry, assets.meAvatarAura.materials[0]);
	torso = new THREE.Mesh(assets.meAvatarBody.geometry, assets.meAvatarBody.materials[0]);
	innerglobe = new THREE.Mesh(assets.meAvatarGlobe.geometry, assets.meAvatarGlobe.materials[0]);
	
	var outerglobeMat = new THREE.MeshLambertMaterial();
	outerglobeMat = assets.meAvatarGlobe.materials[0].clone();
	outerglobe = new THREE.Mesh(assets.meAvatarGlobe.geometry, outerglobeMat);
	
	head.geometry.computeBoundingBox(); head.geometry.computeBoundingSphere();
	cape.geometry.computeBoundingBox(); cape.geometry.computeBoundingSphere();
	aura.geometry.computeBoundingBox(); aura.geometry.computeBoundingSphere();
	torso.geometry.computeBoundingBox(); torso.geometry.computeBoundingSphere();
	innerglobe.geometry.computeBoundingBox(); innerglobe.geometry.computeBoundingSphere();
	outerglobe.geometry.computeBoundingBox(); outerglobe.geometry.computeBoundingSphere();
		
	innerglobe.material.transparent  = true;
	innerglobe.material.opacity  = .3;
	innerglobe.material.blending  = THREE.AdditiveBlending;
	innerglobe.material.shading  = THREE.FlatShading;
	innerglobe.material.depthTest  = false;
	
	outerglobe.material.transparent = true;
	outerglobe.material.wireframe = true;
	outerglobe.material.opacity = .05;
	outerglobe.material.wireframeLinewidth = .25
	
	aura.material.transparent  = true;
	aura.material.opacity  = .3;
	aura.material.blending  = THREE.AdditiveBlending;
	aura.material.shading  = THREE.FlatShading;
	aura.material.depthTest  = false;
	
	innerglobe.material.needsUpdate = true;
	outerglobe.material.needsUpdate = true;
	aura.material.needsUpdate = true;
	
	innerglobe.scale.set(.8,.8,.8);
	outerglobe.scale.set(.8,.8,.8);
	aura.scale.set(.9,.9,.9);
		
	this.presence.add(head);
	this.presence.add(cape);
	this.presence.add(aura);
	this.presence.add(torso);
	this.presence.add(innerglobe);
	this.presence.add(outerglobe);
	
	
	// BODY/PRESENCE PARTICLES //
	/////////////////////////////
    var particles = new THREE.Geometry();
    var pMaterial = new THREE.ParticleBasicMaterial({
    	opacity: .75,
    	size: 1.5,
    	map: THREE.ImageUtils.loadTexture(
    		"textures/particle.png"),
    	blending: THREE.AdditiveBlending,
    	transparent: true,
    	depthWrite: true, depthTest: false
   	});

	var particle = this.presence.position;
	
	particles.vertices.push(particle);
	
	// create the particle system
	this.glowie.geometry = particles;
	this.glowie.material = pMaterial;

	this.glowie.sortParticles = true;
	
	this.presence.add(this.glowie);
	// this.avatar.add(this.sparkles.getSystem());
	
	// CAMERA HELPERS //
	////////////////////
	this.cameraTarget = new THREE.Mesh(new THREE.CubeGeometry(.05,.05,.05), new THREE.MeshNormalMaterial());
	this.cameraActual = new THREE.Mesh(new THREE.CubeGeometry(.025,.025,.025), new THREE.MeshNormalMaterial());
	this.cameraTarget.position.set(2,2,2);
	this.cameraActual.position.set(4,3,3);
	this.cameraTarget.visible = false;
	this.cameraActual.visible = false;
	this.cameraTarget.name = 'cameraTarget';
	this.cameraActual.name = 'cameraActual';
	
	this.add(this.cameraTarget);
	this.add(this.cameraActual);
	
	// PRIVATE METHODS //
	/////////////////////
	this.toScreenXY = function(position, camera, jqdiv) {
		// converts 3D position to screen coords	
		var width = jqdiv.width(), height = jqdiv.height();
		var widthHalf = width / 2, heightHalf = height / 2;
		var position = position, camera = camera;
		
		var projector = new THREE.Projector();
		var vector = projector.projectVector( position, camera );
		
		vector.x = ( vector.x * widthHalf ) + widthHalf;
		vector.y = - ( vector.y * heightHalf ) + heightHalf;
		
	    return { x: vector.x, y: vector.y }; 	
	};
	
	this.delayBindings = function() {
		var self = this;
		var t = setTimeout(function(){
			//self.doMouseEnter = self.doMouseEnterDelayed;
			//self.doMouseLeave = self.doMouseLeaveDelayed;
		},2000)
	}


	// EVENT BINDINGS/HANDLERS //
	/////////////////////////////
	this.tick = function(delta) {
		
		var spot = this.glowie.position;
		this.sparkles.update(delta);
					
		// innerglobe.material.opacity  = .3;
		if(!this.globeGlow) {
			if(innerglobe.material.opacity  > .1) {
				innerglobe.material.opacity -= .0005;
				outerglobe.material.opacity -= .0005;
				aura.material.opacity -= .0005;
			} else {
				this.globeGlow = true;
			}
		}
		
		if(this.globeGlow) {
			if(innerglobe.material.opacity  < .4) {
				innerglobe.material.opacity += .0005;
				outerglobe.material.opacity += .0005;
				aura.material.opacity += .0005;
			} else {
				this.globeGlow = false;
			}
		}
						
	} //// end tick ////
	
	this.doClick = function(mouse) {
		//alert('STAHPIT!!! ' + mouse.x + ',' + mouse.y);
		var self = this.parent;
		if(!self.menu) {
			var props = { xpos: mouse.x, ypos: mouse.y-30};
			self.menu = new MEUI.ContextMenu(props);
		} else {
			self.menu.updatePos(mouse.x-240,mouse.y-200);
			self.menu.fadeIn();
		}
		
	};
	
	this.doMouseEnterDelayed = function(mouse) {
		var self = this.parent;
		
		var checkPOS = self.position.clone();	
		var mousePOS = (self.toScreenXY(checkPOS, self.camera, $('body')));
				
		if (!self.tooltip) {
			var props = { xpos: mousePOS.x-100, ypos: mousePOS.y-100,
						  message: 'Tooltip for the win!' };
						   
			self.tooltip = new MEUI.Tooltip(props); 
		} else {
			self.tooltip.fadeIn();
		}
		
		//self.tooltip.updatePos(mousePOS.x-100,mousePOS.y-100);
		
	};
	
	this.doMouseLeaveDelayed = function(mouse) {
		var self = this.parent;
		if (self.tooltip) self.tooltip.fadeOut();		
	};
		
		
	// INITIALIZE //
	////////////////
	this.init();
	this.delayBindings();
	
	this.useQuaternion = true;
	this.presence.dirtyVertices = true;
	
	//this.position.set(this.location);
	this.presence.scale.set(.02,.02,.02);
	this.position = this.location;
	this.add(this.presence);
	
	if(self.isMyAvatar) {
		var meh = self;
		console.log(meh);
		var popUpdate = window.setInterval(function(){
			meh.sendLoc(meh);			
		},500);
		
	}
	
	return this;

};


/*
 * API
 */

ME3D.extend(THREE.Object3D, ME3D.Avatar);

ME3D.Avatar.prototype.constructor = ME3D.Avatar;

ME3D.Avatar.prototype.getBoundingBox = function() {
	
	var bounds = new THREE.Geometry();
	var models = this.presence.getDescendants();
	
	for(var i=0,j=models.length; i<j; i++){
		THREE.GeometryUtils.merge(bounds, models[i].geometry);
	};
	
	
	bounds.computeBoundingBox();
	bounds.boundingBox.max.multiplyScalar(.02,.02,.02)
	console.log(bounds.boundingBox);
	return bounds.boundingBox.max;

};

ME3D.Avatar.prototype.updateLoc = function(location, heading, velocity) {
	
	//console.log(location);
	
	this.location.copy(location);
	//this.heading = heading;
	//this.velocity = velocity;
	
};

ME3D.Avatar.prototype.sendLoc = function(ctx) {
	
	var self = this;
	//console.log(ctx.location);
	var pulse = {
		'origin': MEUI.Channel.avatarID,
		xloc: ctx.location.x,
		yloc: 0.5,
		zloc: ctx.location.z	
	};
		
	//console.log('call: MEUI.ChatBox.broadcast()');
	MEUI.Wish('updateLoc', pulse, function(d){
		//console.log(d);
	});
	
};


/*
 * ASSETS
 */


ME3D.Preloader.add('models/me_avatar_fox_aura.json', 'meAvatarAura');
ME3D.Preloader.add('models/me_avatar_fox_head.json', 'meAvatarHead');
ME3D.Preloader.add('models/me_avatar_fox_body.json', 'meAvatarBody');
ME3D.Preloader.add('models/me_avatar_fox_cape.json', 'meAvatarCape');
ME3D.Preloader.add('models/me_avatar_fox_globe.json', 'meAvatarGlobe');
