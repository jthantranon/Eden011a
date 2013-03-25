/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Base object for creating actors, items, and other objects that
 * are part of the ME game world;
 */


ME3D.Entity = function() {
	
	this.tick = function(){};
	
	this.doClick = function() {
			console.log("object clicked");
	}
	
	this.doMouseEnter = function() {
			console.log("mouse inside");
	}
		
	this.doMouseLeave = function() {
			console.log("mouse left");
	}
	//this.destroy = function(){ ME3D.Ticker.remove(this); };
	
	this.init = function(){ ME3D.Ticker.add(this); };
	
};

/*
 * API
 */

// ME3D.extend(THREE.Mesh, ME3D.Entity);

ME3D.Entity.prototype.constructor = ME3D.Entity;