/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Glass base class for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.ContextMenu = function (props) {
	
	// INHERITANCE //
	MEUI.Sheet.call(this);
	
	var self = this;
	
	// default paramaters //
	////////////////////////
	this.options = {
		message: "",
		picture:"default",
		xpos:20,
		ypos:20,
		actions: []
	}
	
	if (typeof props !== 'undefined') MEUI.merge(this.options, props);
	
	// object properties //
	///////////////////////
	this.from = this.options.from;
	this.picture = this.options.picture;
	this.message = this.options.message;
	this.xpos = this.options.xpos;
	this.ypos = this.options.ypos;
	this.actions = this.options.actions;
	this.$actionCtx = [];
			
	
	// template properties
	this.CSSFILE = 'contextmenu.css';
			
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
		
		
		
		for(var i=0,j=this.actions.length; i<j; i++){
			//alert(self.actions[i]);
			var place = self.$domctx.children('.contextMenuContent');
			self.$actionCtx[i] = $('<p>'+ self.actions[i][0] +'</p>').appendTo(place);
									
		};
		
		for(var k=0,l=self.$actionCtx.length; k<l; k++){
			var currentAction = self.actions[k][1];
			self.$actionCtx[k].on('click', function(){
				currentAction();				
			});
		};
				
		
		this.bindings();
		
	};
	

	// EVENT BINDINGS //
	////////////////////
	this.bindings = function() {
		
		$ctx = this.$domctx;
		
		//this.enableDrag();
		// this.enableResize();
		//this.enableFade();
							
		// position fix if draggble/resize is added
		$ctx.css({'position':'fixed'})	
		// $('body').on('mouseup', function() {
			// $ctx.fadeOut('fast');
		// });
		
		// $('canvas').on('click', function() {
			// $ctx.fadeOut('fast');
		// });		
		
		// TODO: add in hax to fix opacity flicker on resize event if needed
		
	};
	
	
	this.spriteMenu = function(plateName) {
		var canvas = document.createElement('canvas');
		var size = 250;
		canvas.width = size;
		canvas.height = size;
		var context = canvas.getContext('2d');
		context.textAlign = 'center';
		context.font = '18px Tahoma';
		context.fillStyle = "#00FFFF";
		context.fillText(plateName, size/2, size/2 );
		
		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		var sprite = new THREE.Sprite(new THREE.SpriteMaterial({
	    	map: texture,
	    	transparent: true,
	    	useScreenCoordinates: false
	  	}));
	  	
	  	sprite.position.y = .35;
	  	self.add(sprite);
	}
	
	
	// INITIALIZE //
	////////////////	
	this.init();
	
};


/*
 * API - PROTOTYPE INHERITANCE
 */

MEUI.extend(MEUI.Sheet, MEUI.ContextMenu);

// prototype inheritance
MEUI.ContextMenu.prototype.constructor = MEUI.ContextMenu;

MEUI.ContextMenu.prototype.destroy = function() {
	this.$domctx.remove();
	delete this;	
};

MEUI.ContextMenu.prototype.updateLocation = function(coords) {
	this.$domctx.css({'left':coords.x-300,'top':coords.y-230});
};


/*
 * GLOBALS
 */