/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Glass base class for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.Dialog = function (props) {
	
	// INHERITANCE //
	MEUI.Sheet.call(this);
	
	var self = this;
	
	// default paramaters //
	////////////////////////
	this.options = {
		message: "",
		from: "Anonymous",
		portrait:"default",
		ypos:0
	}
	
	if (typeof props !== 'undefined') MEUI.merge(this.options, props);
	
	// object properties //
	///////////////////////
	this.from = this.options.from;
	this.portrait = this.options.portrait;
	this.message = this.options.message;
	this.ypos = this.options.ypos;
			
	
	// template properties
	this.CSSFILE = 'dialog.css';
			
	this.wrapperStart = '<div class="dialogWrapper" id="' + this.id + '">';
	this.wrapperEnd = '</div>';
	
	this.tmpl = this.wrapperStart + this.wrapperEnd;
	
	
	// initialization	
	this.init = function() {
		
		this.checkCSS();
		this.checkMinContainer();
		
		this.$domctx = $(this.tmpl).appendTo(this.context);
		this.$domctx.jqoteapp('#dialogTmpl');
		this.$domctx = this.$domctx.children('.dialogWrapper');
		this.$domctx.unwrap();
	
		
		var $ctx = this.$domctx;
						
		$ctx.css({"left":this.xpos,"top":this.ypos}); // set starting location
		$ctx.find('img').attr('src','img/portraits/'+self.portrait+'.png'); // set pic
		$ctx.find('img').css({"opacity":.8}); // set pic opacity
		$ctx.css({"opacity":this.opacity}); // set starting opacity
		$ctx.attr('data-name',this.name); // set name
		
		this.bindings();
		
	};
	

	// EVENT BINDINGS //
	////////////////////
	this.bindings = function() {
		
		$ctx = this.$domctx;
		
		this.enableDrag();
		this.enableResize();
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

MEUI.extend(MEUI.Sheet, MEUI.Dialog);

// prototype inheritance
MEUI.Dialog.prototype.constructor = MEUI.Dialog;

/*
 * GLOBALS
 */