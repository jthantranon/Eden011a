/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Chat box for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.ChannelMaster = function (props) {
	
	// default paramaters //
	////////////////////////
	this.options = {
		
	}
	
	if (typeof props !== 'undefined') MEUI.merge(options, props);
	
	// object properties //
	///////////////////////
	this.chatlist = [];
		
	
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

{
	pulseType:'type',
	
	content: {
		
		channel:'global',
		user:'name',
		message:'message'
	}
}


// no prototype inheritance
MEUI.Widget.prototype = {
		
	constructor: ME3D.Widget,
	
	log: = function {
		console.log(this);
	},
	
	register: = function {
		
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