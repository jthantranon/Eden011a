/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Glass base class for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.Glass = function (props) {
	
	// INHERITANCE //
	//MEUI.UIElement.call(this);
	
	var self = this;
	
	// default paramaters //
	////////////////////////
	this.options = {
		context: "body",
		content: "",
		xpos: 100,
		ypos: 100,
		title: "Empty Glass",
		name: '',
		opacity:1,
		id:MEUI.GlassID++	
	}
	
	if (typeof props !== 'undefined') MEUI.merge(options, props);
	
	// object properties //
	///////////////////////
	
	this.id = this.options.id;
	this.context = this.options.context;
	this.title = this.options.title;
	this.xpos = this.options.xpos;
	this.ypos = this.options.ypos;
	this.$domctx = ''; // dom context
	this.opacity = this.options.opacity;
		
	this.template = '\
			<div class="glassHeader">\
		        <div class="centerWrap">\
		            <div class="glassCenter">\
		                <div class="innertube"><img src="img/glass/topBorderCenter.png" width="100%" height="10"></div>\
		            </div>\
		        </div> \
		        <div class="glassLeft">\
		            <div class="innertube"><img src="img/glass/topBorderLeft.png" width="10" height="10"></div>\
		        </div>  \
		        <div class="glassRight">\
		            <div class="innertube"><img src="img/glass/topBorderRight.png" width="10" height="10"></div>\
		        </div>   \
			</div>\
		  <div class="glassTitle">The Title</div>\
		  <div class="glassReflection"></div>\
		  <div class="glassMinButton"></div>\
		<div class="glassCloseButton"></div>\
		  <div class="glassTabWrapper">\
		      <div class="glassTabsLeft"></div>\
		      <div class="glassTabsRightWrapper">\
		          <div class="glassTabsRight"></div>\
		      </div>\
		  </div>\
		    <div class="glassContent">\
		    </div>';
	
	
	// private properties //
	///////////////////////
	
	var CSSFILE = 'glass.css';
	
	var wrapperStart = '<div class="glassWrapper" id="' + this.id + '">';
	var wrapperEnd = '</div>';
	
	var tmpl = wrapperStart + this.template + wrapperEnd;
	
	
	// private methods //
	/////////////////////
	
	var checkCSS = function() {
		if(!$('link[href="css/'+CSSFILE+'"]').length) {
			$('head').append('<link href="css/'+CSSFILE+'" rel="stylesheet" type="text/css">');
		};
	};


	var checkMinContainer = function() {
		var mycontext = self.context;
		var mytemplate = '<div class="glassMinContainer"></div>';
		
		if(!$('.glassMinContainer').length) {
			$(mycontext).append(mytemplate);
		};
	};
	
	var init = function() {
				
		self.$domctx = $(tmpl).appendTo(self.context);
		
		self.$domctx.children('.glassTitle').text(self.title); // set title
		self.$domctx.children('.glassContent').empty(); // empty content			
		self.$domctx.css({"left":self.xpos,"top":self.ypos}); // set starting location
		self.$domctx.css({"opacity":self.opacity}); // set starting opacity
		self.$domctx.attr('data-name',name); // set name
		
	};
	
	
	// EVENT BINDINGS //
	////////////////////
	this.bindings = function() {
		
		$ctx = self.$domctx;
		
		self.transparent();
		
		$ctx.draggable({handle:'.glassTabWrapper'});
		$ctx.css({'position':'fixed'})		
		$ctx.resizable({alsoResize:$ctx});
		
		// TODO: add in hax to fix opacity flicker on resize event if needed
		
		$ctx.children('.glassMinButton').on('click',function(e){
			self.minimize();
		});
		
		$ctx.children('.glassCloseButton').on('click',function(e){
			self.close();
		});
		
		// $ctx.on('mouseenter',function(e){
			// self.opaque();
		// });
// 		
		// $ctx.on('mouseleave',function(e){
			// self.transparent();
		// });
			
	};
	
	
	// INITIALIZE //
	////////////////
	checkCSS();
	checkMinContainer();
	init();
	this.bindings();
	
};


/*
 * API
 */

// no prototype inheritance
MEUI.Glass.prototype = {
		
	constructor: MEUI.Glass,
	
	log: function() {
		console.log(this);
	},
	
	setTitle: function(newTitle) {
		this.title = newTitle;
		$('#'+this.id).children('.glassTitle').text(newTitle);
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
	
	hide: function() {
		$('#'+this.id).hide();
	},

	show: function() {
		$('#'+this.id).show();
	},
	
	minimize: function() {
		alert('Minimize');
	},
	
	maximize: function() {
		
	},
	
	close: function() {
		alert('Close');
	},
	
	transparent: function() {
		this.$domctx.css({'opacity':.2});
	},
	
	opaque: function() {
		this.$domctx.css({'opacity':1});
	},
	
	clearEvents: function() {
		this.$domctx.clearQueue();
	}		
	
};


/*
 * GLOBALS
 */