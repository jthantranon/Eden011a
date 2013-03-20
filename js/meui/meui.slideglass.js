/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.0
 * Glass base class for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.SlideGlass = function (props) {
	
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
	this.position = 'closed';
	this.content = '';
		
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
		var $ctx = self.$domctx;
		
		// hax to make sure dom widths are calculated correctly
		self.$domctx.css({'left':-5000}); // set out of sight
		
		setTimeout(function() {
						
			var startXPos = 0 - $ctx.innerWidth();
					
			self.$domctx.children('.glassTitle').text(self.title); // set title
			self.$domctx.children('.glassContent').empty(); // empty content			
			self.$domctx.css({"left":startXPos,"top":self.ypos}); // set starting location
			self.$domctx.css({"opacity":self.opacity}); // set starting opacity
			self.$domctx.attr('data-name',name); // set name
			self.addContent = self.content;
			
		}, 500);
		
		
				
	};
	
	
	// EVENT BINDINGS //
	////////////////////
	this.bindings = function() {
		
		$ctx = self.$domctx;
		
		self.transparent();
		
		$ctx.draggable({handle:'.glassTabWrapper',axis: "y"});
		$ctx.css({'position':'fixed'})		
		// $ctx.resizable({alsoResize:$ctx});
		
		// TODO: add in hax to fix opacity flicker on resize event if needed
		
		$ctx.children('.glassMinButton').on('click',function(e){
			self.minimize();
		});
		
		$ctx.children('.glassCloseButton').on('click',function(e){
			self.close();
		});
		
		$ctx.on('mouseenter',function(e){
			self.opaque();
		});
		
		$ctx.on('mouseleave',function(e){
			self.transparent();
		});
		
		$ctx.on('mouseup', function() {
			self.slide();
		});
			
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
MEUI.SlideGlass.prototype = {
		
	constructor: MEUI.SlideGlass,
	
	log: function() {
		console.log(this);
	},
	
	setTitle: function(newTitle) {
		this.title = newTitle;
		$('#'+this.id).children('.glassTitle').text(newTitle);
	},
	
	addContent: function(content) {
		//alert($(this.$domctx).children('.glassContent').html());
		//alert($(this.$domctx).html());
		//alert(content);
		$(this.$domctx).children('.glassContent').append(content);
	},
	
	makeContent: function(content) {
		$(this.$domctx).children('.glassContent').html(content);
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
		//alert('Minimize');
		alert(this.$domctx.width());
	},
	
	maximize: function() {
		
	},
	
	close: function() {
		alert('Close');
	},
	
	transparent: function() {
		this.$domctx.css({'opacity':.5});
	},
	
	opaque: function() {
		this.$domctx.css({'opacity':1});
	},
	
	slide: function() {
		var self = this;
		var $ctx = this.$domctx;
		var width = $ctx.width();
		var closePos = -width;
				
		// TODO: add animations for sliding
		
		if(self.position == 'closed') {
			$ctx.css({'left':0}); self.position = 'open'; }
		else if (self.position == 'open') { 
			$ctx.css({'left':-width}); self.position = 'closed'; }
	}	
	
};


/*
 * GLOBALS
 */
