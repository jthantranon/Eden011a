/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Chat box for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

ME3D.Interactions = function (props) {
	
	// inheritance //
	/////////////////
	UIControls.UIControl.call(this);
	//ME3D.Ticker.add(this);
	
	// default paramaters //
	////////////////////////
	this.options = {
		camera:{},
		dom:{}
	}
	
	if (typeof props !== 'undefined') MEUI.merge(options, props);
	
	this.camera = this.options.camera;
	this.dom = this.options.camera;
	
	this._clickables = [];
	
	// object properties //
	///////////////////////
	
	
	// private properties //
	///////////////////////
	
	
	// private methods //
	/////////////////////
	this.mouseDown = function(event) {
		this.interact.call(this, 'mouseDown', event);
    }


	this.mouseUp = function(event) {
		this.interact.call(this, 'mouseUp', event);
    }


	this.click = function(event) {
		this.interact.call(this, 'click', event);
    }


	this.dblClick = function(event) {
		this.interact.call(this, 'dblClick', event);
    }


	this.mouseMove = function(event) {
		this.interact.call(this, 'mouseMove', event);
    }
	
		
	/******************* 
	 *  EVENT BINDINGS  
	 *******************/
	
	this.addUIEventListener(this.dom, 'mousedown', mouseDown.bind(this), false);

    this.addUIEventListener(this.dom, 'mouseup', mouseUp.bind(this), false);

    this.addUIEventListener(this.dom, 'click', click.bind(this), false);

    this.addUIEventListener(this.dom, 'dblclick', dblClick.bind(this), false);

    //commented out for performance
    //this.addUIEventListener(this.dom, 'mousemove', mouseMove.bind(this), false);	
	
};


/*
 * API - PROTOTYPE INHERITANCE
 */

ME3D.extend(UIControls.UIControl, ME3D.Interactions);

// prototype inheritance
ME3D.Interactions.prototype.constructor = ME3D.InteractionManager;

ME3D.Interactions.prototype.log = function() {
	console.log(this);
};


ME3D.Interactions.prototype.interact = function(type, event) {
	
	// set up the projector and raycaster for intersect test
    var projector = new THREE.Projector(), rect = this.dom.getBoundingClientRect(), vector = new THREE.Vector3(((event.clientX - rect.left) / rect.width ) * 2 - 1, -((event.clientY - rect.top) / rect.height ) * 2 + 1, 0.5);
    projector.unprojectVector(vector, this.camera);

    var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());

    // these are the items that will be tested against
    var intersects = raycaster.intersectObjects(this._clickables);

    // do something with the intersects if thier are any
    if (intersects.length > 0) {
    	
    	// see if its an object of the correct type and trigger it's event
        if (typeof intersects[0].object[type] === 'function') {
            intersects[0].object[type](event);
        }
    }
}; 



ME3D.Interactions.prototype.addClickable = function(entity) {

	// see if this is a valid entity -- skipping this for now
	//if (entity instanceof ME3D.Entity.ClickableMesh) {
	if (entity) {
		
		// check to see if this item has already been added
		// to the _clickable array, if not, then add it and
		// save its index in the entity passed
        if (typeof entity._clickableIdx === 'undefined') {
            this._clickables.push(entity);
            obj._clickableIdx = this._clickables.length - 1;
        }

    }
	
	// now add the children of this entity to the
	// clickables list recursively
    for (var i = 0, l = entity.children.length; i < l; i++) {
        this.addClickable.call(this, entity.children[i]);
    }

    return this;

}

ME3D.Interactions.prototype.removeClickable = function(entity) {
	
	// grab the index so we know what to remove
    var idx = entity._clickableIdx;
    
    // make sure this object is actually on the list by checking index
    if (typeof idx !== 'undefined') {
    	
    	// cut it out!
        this._clickables.splice(idx, 1);
        delete entity._clickableIdx;
        
        // now update the indexes of all of the remaining items
        // so their new index will be stored after the splice
        for(var i = idx, l = this._clickables.length; i < l; i++ ){
            this._clickables[i]._clickableIdx = i;
        }
    }
    
    // now remove all of the items for the children recursively
    for (var i = 0, l = entity.children.length; i < l; i++) {
    	this.removeClickable.call(this, entity.children[i]);
    }

    return this;

}

	
	
/*
 * API
 */

// no prototype inheritance
//MEUI.Widget.prototype = {
//		
//	constructor: ME3D.Widget,
//	
//	log: {
//		console.log(this);
//	}
//
//};



/*
 * ASSETS
 */

//ME3D.Preloader.add('url/to-asset.json', 'uniqueHandle');