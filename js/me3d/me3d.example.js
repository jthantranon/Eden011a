/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Chat box for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.Widget = function (props) {
	
	// inheritance //
	/////////////////
	//MEUI.Control.call(this);
	//this.init();
	
	// default paramaters //
	////////////////////////
	this.options = {
		
	}
	
	if (typeof props !== 'undefined') MEUI.merge(options, props);
	
	// object properties //
	///////////////////////
	
	
	// private properties //
	///////////////////////
	
	
	// private properties //
	///////////////////////
	
		
	/******************* 
	 *  EVENT BINDINGS  
	 *******************/
	
	
};


/*
 * API
 */

// no prototype inheritance
MEUI.Widget.prototype = {
		
	constructor: ME3D.Widget,
	
	log: function() {
		console.log(this);
	}

};

	/*
	 * API - PROTOTYPE INHERITANCE
	 */
	
//	MEUI.extend(MEUI.Control, MEUI.Widget);
//	
//	// prototype inheritance
//	MEUI.Widget.prototype.constructor = ME3D.Widget;
//	
//	MEUI.Widget.prototype.log = function() {
//		console.log(this);
//	}

/*
 * ASSETS
 */

//ME3D.Preloader.add('url/to-asset.json', 'uniqueHandle');