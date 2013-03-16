/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Base object for creating actors, items, and other objects that
 * are part of the ME game world;
 */


ME3D.Entity = function() {
	
	THREE.Mesh.call(this);
    UIControls.UIControl.call(this);
		
	var self = this;
	
	this.init = function(){ ME3D.Ticker.add(this); };
	this.tick = function(){};
	this.click = function(event){ console.log(this) };
	this.mouseIn = function(){ console.log(this) };
	this.mouseOut = function(){ console.log(this) };
	this.destroy = function(){ ME3D.Ticker.add(this); };
	
};

/*
 * API
 */

ME3D.extend(THREE.Mesh, ME3D.Entity);

ME3D.Entity.prototype.constructor = ME3D.Entity;