/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.1
 * Currently creates a generic npc model and effects for MetaEden.
 */

// TODO: default parameters and arguments
// TODO: evolve avatar design


MEUI.DialogPlayer = function (props) {
	
	var self = this;

	// DEFAULT PROPERTIES //
	////////////////////////
	this.options = {
		messages: ['Nothing to say...']
	}
	
	if (typeof props !== 'undefined') MEUI.merge(this.options, props);
	
	
	// OBJECT PROPERTIES //
	///////////////////////
	this.messages = this.options.messages;

	
	// PRIVATE METHODS //
	/////////////////////
	this.init = function() {
		for(var i=0,j=this.messages.length; i<j; i++){
		  alert(this.messages[i]);
		};
	}

	// EVENT BINDINGS/HANDLERS //
	/////////////////////////////

		
	// INITIALIZE //
	////////////////
	this.init();
	return this;

};


/*
 * API
 */

//ME3D.extend(THREE.Sheet, ME3D.DialogPlayer);

MEUI.DialogPlayer.prototype = {
	
	constructor: MEUI.DialogPlayer,
	
	log: function(){
		console.log(this);
	}
}

