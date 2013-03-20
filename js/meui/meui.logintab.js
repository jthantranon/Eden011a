/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Glass base class for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.LoginTab = function (props) {
	
	// INHERITANCE //
	MEUI.SlideGlass.call(this);
	
	var self = this;
	
	// default paramaters //
	////////////////////////
	// this.options = {
		// context: "body",
		// content: "",
		// xpos: 100,
		// ypos: 100,
		// title: "Empty Glass",
		// name: '',
		// opacity:1,
		// id:MEUI.GlassID++	
	// }
// 	
	// if (typeof props !== 'undefined') MEUI.merge(options, props);
	
	// object properties //
	///////////////////////
	
	// this.id = this.options.id;
	// this.context = this.options.context;
	// this.title = this.options.title;
	// this.xpos = this.options.xpos;
	// this.ypos = this.options.ypos;
	// this.$domctx = ''; // dom context
	// this.opacity = this.options.opacity;
	// this.position = 'closed';
		
	this.content = '<button type="button">Doeet!</button>';
	
	
	// private methods //
	/////////////////////
		
	var initContent = function() {
		
		var ctx = self.$domctx;
		
		self.title = 'Authenticate';
		
		//another fucking hack....
		setTimeout(function() {
			$(ctx).children('div.glassContent').append(self.content);
		 }, 1500);		
	}
	
	
	// CUSTOM BINDINGS //
	////////////////////
	this.customBindings = function() {
		
	};
	
	
	// INITIALIZE //
	////////////////
	initContent();
	this.customBindings();
	
};


/*
 * API - PROTOTYPE INHERITANCE
 */

MEUI.extend(MEUI.SlideGlass, MEUI.LoginTab);

// prototype inheritance
MEUI.LoginTab.prototype.constructor = MEUI.LoginTab;
