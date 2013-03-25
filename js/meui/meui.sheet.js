/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Sheet base class for MetaEden UI
 */

// TODO: Pair down CSS for sheet or combine all sheet based
// elements to use the same css (recommended)

MEUI.Sheet = function (props) {
		
	var self = this;
	
	// default paramaters //
	////////////////////////
	this.options = {
		context: "body",
		content: "",
		xpos: 100,
		ypos: 100,
		name: '',
		opacity:1,
		alpha:.3,
		id:MEUI.GlassID++	
	}
	
	if (typeof props !== 'undefined') MEUI.merge(this.options, props);
	
	// object properties //
	///////////////////////
	
	this.id = this.options.id;
	this.context = this.options.context;
	this.xpos = this.options.xpos;
	this.ypos = this.options.ypos;
	this.$domctx = ''; // dom context
	this.opacity = this.options.opacity;
	this.alpha = this.options.alpha;
	
	// template properties
	this.CSSFILE = 'sheet.css';
			
	this.wrapperStart = '<div class="sheetWrapper" id="' + this.id + '">';
	this.wrapperEnd = '</div>';
	
	this.tmpl = this.wrapperStart + this.wrapperEnd;
	
	
	// initialization	
	this.init = function() {
		// alert('fuck this');
// 		
		// this.checkCSS();
		// this.checkMinContainer();
// 		
		// this.$domctx = $(this.tmpl).appendTo(this.context);
		// this.$domctx.jqoteapp('#sheetTmpl');
		// this.$domctx = this.$domctx.children('.sheetWrapper');
		// this.$domctx.unwrap();
// 	
// 		
		// var $ctx = this.$domctx;
// 						
		// $ctx.css({"left":'100px',"top":'100px'}); // set starting location
		// $ctx.css({"opacity":.5}); // set starting opacity
		// $ctx.attr('data-name',self.name); // set name
// 		
		// this.bindings();
		
	};
	
	
	// EVENT BINDINGS //
	////////////////////
	this.bindings = function() {
		
		// $ctx = this.$domctx;
// 		
		// this.enableDrag();
		// this.enableResize();
		// this.enableFade();
// 							
		// // position fix if draggble/resize is added
		// $ctx.css({'position':'fixed'})		
// 		
		// // TODO: add in hax to fix opacity flicker on resize event if needed
		
	};
	
	
	// INITIALIZE //
	////////////////	
	this.init();
		
};


/*
 * API
 */

// no prototype inheritance
MEUI.Sheet.prototype = {
		
	constructor: MEUI.Sheet,
	
	log: function() {
		console.log(this);
	},
	
	checkCSS: function() {
		var self = this;
		if(!$('link[href="css/'+self.CSSFILE+'"]').length) {
			$('head').append('<link href="css/'+self.CSSFILE+'" rel="stylesheet" type="text/css">');
		};
	},

	checkMinContainer: function() {
		var self = this;
		var mycontext = self.context;
		var mytemplate = '<div class="glassMinContainer"></div>';
		
		if(!$('.glassMinContainer').length) {
			$(mycontext).append(mytemplate);
		};
	},
	
	append: function(content) {
		$('#'+this.id).children('.glassContent').append(content);
	},
	
	clear: function() {
		$('#'+this.id).children('.glassContent').empty();
	},
	
	clearFill: function(content) {
		$('#'+this.id).find(context).empty();
		$('#'+this.id).find(context).append(content);
	},
	
	destroy: function() {
		$('#'+this.id).remove();	
		delete this;
	},
	
	enableDrag: function(handle) {
		var self = this;
		if(typeof handle === 'undefined') {	
			self.$domctx.draggable({snap:"window, .sheetWrapper",
									containment: "window",
									snapTolerance: 20 }); }
		else { self.$domctx.draggable({handle:handle,
									   snap:"window",
									   containment: "window",
									   snapTolerance: 20 }); }
	},
	
	enableResize: function(also) {
		var self = this;
		if(typeof also === 'undefined') {	
			self.$domctx.resizable({}); }
		else { self.$domctx.resizable({alsoResize:also}); }
	},
	
	enableFade: function() {
		var self = this;
		var $ctx = this.$domctx;
		$ctx.on('mouseenter', function(e){ $ctx.fadeTo(2,1); });
		$ctx.on('mouseleave', function(e){ $ctx.fadeTo(2,self.alpha); }); 
	},
	
	disableFade: function() {
		
	},
	
	hide: function() {
		var self = this;
		var $ctx = self.$domctx;
		$ctx.hide();
	},

	show: function() {
		var self = this;
		var $ctx = self.$domctx;
		$ctx.show();
	},
	
	fadeIn: function() {
		var self = this;
		var $ctx = self.$domctx;
		$ctx.fadeIn();
	},
	
	fadeOut: function(speed) {
		var self = this;
		var $ctx = self.$domctx;
		$ctx.fadeOut(speed,function(){ $ctx.clearQueue() });
	},
	
	minimize: function() {
		alert('Minimize');
	},
	
	maximize: function() {
		alert('Maximize');
	},
	
	close: function() {
		alert('Close');
	},
	
	transparent: function(opacity) {
		if (typeof opacity !== 'undefined') this.$domctx.css({'opacity':.2});
		else this.$domctx.css({'opacity':opacity});		
	},
	
	opaque: function() {
		this.$domctx.css({'opacity':1});
	},
	
	updatePos: function(x,y) {
		this.$domctx.css({"left":x,"top":y});
	}	
	
};


/*
 * GLOBALS
 */

MEUI.GlassID = 0;