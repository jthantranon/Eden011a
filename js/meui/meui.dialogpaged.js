/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Glass base class for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.DialogPaged = function (props) {
	
	var self = this;
	
	// INHERITANCE //
	MEUI.Sheet.call(this);
	
	
	
	// default paramaters //
	////////////////////////
	this.options = {
		message: "",
		from: "Anonymous",
		portrait:"default",
		content:[],
		ypos:0
	}
	
	if (typeof props !== 'undefined') MEUI.merge(this.options, props);
	
	// object properties //
	///////////////////////
	this.from = this.options.from;
	this.portrait = this.options.portrait;
	this.message = this.options.message;
	this.ypos = this.options.ypos;
	this.content = this.options.content;
	this.page = 0;
			
	
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
		this.$domctx.jqoteapp('#dialogPagedTmpl');
		this.$domctx = this.$domctx.children('.dialogWrapper');
		this.$domctx.unwrap();
	
		
		var $ctx = this.$domctx;
		
		$ctx.find('.sheetContent p').remove();
		$ctx.find('.sheetContent').append(this.content[0]);
						
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
		//this.enableResize();
		//this.enableFade();
							
		// position fix if draggble/resize is added
		$ctx.css({'position':'fixed'})		
		
		// TODO: add in hax to fix opacity flicker on resize event if needed
		
		if (this.content.length > 1) {
			$ctx.find('.dialogAdvance').on('click', function() { 
				self.advance();
			});	
		}
		
	};
	
	
	// INITIALIZE //
	////////////////	
	this.init();
	
};


/*
 * API - PROTOTYPE INHERITANCE
 */

MEUI.extend(MEUI.Sheet, MEUI.DialogPaged);

// prototype inheritance
MEUI.DialogPaged.prototype.constructor = MEUI.DialogPaged;

MEUI.DialogPaged.prototype.advance = function(self) {
	
	var self = this;
	
	$ctx = self.$domctx;
	
	
	if (self.page < self.content.length-1) {
		console.log(self);
		$ctx.find('.sheetContent p').remove();
		$ctx.find('.sheetContent').append(self.content[self.page+1]);
		self.page++;
	}
	
	if (self.page = self.content.length) {
		console.log('end');
		$ctx.find('.dialogAdvance').off('click', function() { 
			this.advance();
		});	
	}
};

/*
 * GLOBALS
 */