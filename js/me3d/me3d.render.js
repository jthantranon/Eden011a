/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.5
 * Initializes render loop and manages queues for injecting
 * into render and animation loops for MetaEden.
 */

ME3D.Render = function (scene, camera, props) {
	
	var self = this;
	
	var width = $(window).width(), 
		height = $(window).height();
		
	// OBJECT PROPERTIES //
	///////////////////////
	this.renderer = new THREE.WebGLRenderer();
	this.scene = scene;
	this.camera = camera; 
	
	this.renderer.setSize( width, height );
	$('body').append( this.renderer.domElement );
	
	this.animationQueue = [];
	this.renderQueue = [];
	
	this.renderer.antialias = true;
	//this.renderer.sortObjects = true;
	//this.renderer.shadowMapEnabled = true;
	//this.renderer.shadowMapType = THREE.PCFShadowMap; // THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap. Default is THREE.PCFShadowMap
	 
	
	// INTERNAL METHODS //
	//////////////////////
	// stats
	///////////////////////////////////
	var stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	$('body').append( stats.domElement );
	
	
	function _animate() {
		
		requestAnimationFrame(_animate);
				
		// resolve queue
		for(var i=0,j=self.animationQueue.length; i<j; i++){
			
	  		if(typeof self.animationQueue[i][1] === 'undefined') {
				self.animationQueue[i][0]();
			} else {
				self.animationQueue[i][0](self.animationQueue[i][1]);
			}
		};
		
		_render();
		stats.update();
	}
		
	function _render() {
		
		//resolve queue
		for(var i=0,j=self.renderQueue.length; i<j; i++){
			
			if(typeof self.renderQueue[i][1] === 'undefined') {
				self.renderQueue[i][0]();
			} else {
				self.renderQueue[i][0](self.renderQueue[i][1]);
			}
		};
		
	    self.renderer.render(self.scene, self.camera);
	}
	
	_animate();
};

/**
 * API
 */

ME3D.Render.prototype = {
	constructor: ME3D.Render,
	
	queueRender: function(action, params) {
		// TODO: check to see if this is actually a function?
		this.renderQueue.push([action,params]);
	},
	
	queueAnimation: function(action, params) {
		// TODO: check to see if this is actually a function?
		this.animationQueue.push([action,params]);
	},
	
	removeRender: function(action) {
		// TODO: implement removeRender and test
		//var removeIndex = this.renderQueue.indexOf(action);
		//this.renderQueue.splice(removeIndex,1)
	},
	
	removeAnimation: function(action) {
		// TODO: implement removeAnimation and test
		//var removeIndex = this.animationQueue.indexOf(action);
		//this.animationQueue.splice(removeIndex,1);
	},
	
	setClearColor: function(color) {
		this.renderer.setClearColor(color);
	},
};
