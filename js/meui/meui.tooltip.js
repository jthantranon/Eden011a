/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Glass base class for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.Tooltip = function (props) {
	
	// INHERITANCE //
	MEUI.Sheet.call(this);
	
	var self = this;
	
	// default paramaters //
	////////////////////////
	this.options = {
		message: "",
		picture:"default",
		xpos:20,
		ypos:20
}
	
	if (typeof props !== 'undefined') MEUI.merge(this.options, props);
	
	// object properties //
	///////////////////////
	this.from = this.options.from;
	this.picture = this.options.picture;
	this.message = this.options.message;
	this.xpos = this.options.xpos;
	this.ypos = this.options.ypos;
			
	
	// template properties
	this.CSSFILE = 'tooltip.css';
			
	this.wrapperStart = '<div class="contextMenuWrapper" id="' + this.id + '">';
	this.wrapperEnd = '</div>';
	
	this.tmpl = this.wrapperStart + this.wrapperEnd;
	
	
	// initialization	
	this.init = function() {
		
		this.checkCSS();
		this.checkMinContainer();
		
		this.$domctx = $(this.tmpl).appendTo(this.context);
		this.$domctx.jqoteapp('#contextMenuTmpl');
		this.$domctx = this.$domctx.children('.contextMenuWrapper');
		this.$domctx.unwrap();
	
		
		var $ctx = this.$domctx;
		
		$ctx.css({"left":this.xpos-280,"top":this.ypos-180}); // set starting location
		$ctx.css({"opacity":this.opacity}); // set starting opacity
		$ctx.attr('data-name',this.name); // set name
		
		this.bindings();
		
	};
	

	// EVENT BINDINGS //
	////////////////////
	this.bindings = function() {
		
		$ctx = this.$domctx;
		
		this.enableDrag();
		// this.enableResize();
		//this.enableFade();
							
		// position fix if draggble/resize is added
		$ctx.css({'position':'fixed'})		
		
		// TODO: add in hax to fix opacity flicker on resize event if needed
		
	};
	
	
	// INITIALIZE //
	////////////////	
	this.init();
	
};


/*
 * API - PROTOTYPE INHERITANCE
 */

MEUI.extend(MEUI.Sheet, MEUI.Tooltip);

// prototype inheritance
MEUI.Tooltip.prototype.constructor = MEUI.Tooltip;

MEUI.Tooltip.prototype.destroy = function() {
	this.$domctx.remove();
	delete this;	
};


/*
 * GLOBALS
 */