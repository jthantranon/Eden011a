/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.2.0
 * Chat box for MetaEden UI
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.ChatBox = function (props) {
	
	// inheritance //
	/////////////////
	//MEUI.Control.call(this);
	//this.init();
	
	// default paramaters //
	////////////////////////
	self = this;
	
	this.options = {
		
	}
	
	if (typeof props !== 'undefined') MEUI.merge(options, props);
	
	// object properties //
	///////////////////////
	this.chatlog = [];
	this.shiftdown = false;
	this.logIndex = 0;
	
	// private methods //
	/////////////////////
	function initialize() {
		$('.chatWrapper').fadeTo(3000, 1);
		MEUI.Channel.register('chat');
	} 
	
	
	initialize();
	
		
	/******************* 
	 *  EVENT BINDINGS  
	 *******************/
		
	/////////////////////
	// Image Hover Bindings
	///////////////////////
	$('.chatAnchor')
		.append('<span class="hover"></span>').each(function () {
			var $span = $('> span.hover', this).css('opacity', 0);
			$(this).hover(function () {
				$span.stop().fadeTo(250, 1);
			}, function () {
				$span.stop().fadeTo(500, 0);
			});
		});
	
	$('.chatSettings')
		.append('<span class="hover"></span>').each(function () {
			var $span = $('> span.hover', this).css('opacity', 0);
			$(this).hover(function () {
				$span.stop().fadeTo(250, 1);
			}, function () {
				$span.stop().fadeTo(500, 0);
			});
		});
	
	$('.chatBox')
		.append('<span class="hover"></span>').each(function () {
			var $span = $('> span.hover', this).css('opacity', 0);
			$(this).hover(function () {
				$span.stop().fadeTo(250, 1);
				$(this).children('.tabWrapper').fadeTo(250, .7);
			}, function () {
				$span.stop().fadeTo(500, 0);
				$(this).children('.tabWrapper').fadeTo(250, 0);
			});
		});	
	
	$('.chatWrapper, .chatBox, .chatMessages')
		.hover(function() {
			//myWorld.controls.enabled = false;
		}, function() {
			//myWorld.controls.enabled = true;
		});
	
	
	///////////////////////
	// Drag/Resize Bindings
	///////////////////////
	$('.chatWrapper').draggable({
		handle: '.chatAnchor, .tabs'
	});
	
	$('.chatBox').resizable({
		handles: 'ne',
		alsoResize: ".chatBox span.hover, .messages"
	});
	
	//////////////////////
	// Chat Input Bindings
	//////////////////////
	$(".chatInputMsg").livequery(function(e){
		// entering a message
		$(this).keyup(function(event){
			var content = $(this).val();
			if (event.which == 13) {
				event.preventDefault();
				context = this;

				if (content.charAt(0) == "/") {
					var cSplit = content.split(' ');
					var command = cSplit[0];
					chatLoopback('COMMAND RECIEVED:'+content);
					if (command === '/create'){
						//alert('create');
						var mkType = cSplit[1];
						var rawParams = cSplit[2];
						var params = rawParams.split(',');
						UniCon(mkType,params);
					} else {
						Broadcast("command",content);
					}
					
					
				} else {
					if ($('.chatChannel').val() == "Loopback") {
						self.loopback($(this).val());
					}
					if ($('.chatChannel').val() == "Global") {
						self.loopback($(this).val());
					}
					if ($('.chatChannel').val() == "Local") {
						self.loopback($(this).val());
					}
				}
								
				
				// log chat and clear
				this.chatlog.unshift($(this).val());
				$(this).val("");
				this.logIndex = 0;
			}
		});
		
		// capturing shift hotkey
		$(this).keydown(function(event){
			if (event.which == 16) {
				this.shiftdown = true;
			}
		});
		
		// releasing shift hotkey
		$(this).keyup(function(event){
			if (event.which == 16) {
				this.shiftdown = false;
			}
		});
		
		// show history chat item if shift+uparrow
		$(this).keyup(function(event){
			if (event.which == 38) {
				if (this.shiftdown && (this.this.logIndex < this.chatlog.length)) {
					$(this).val(this.chatlog[this.logIndex]);
					this.logIndex++;
				}
			}
		});
		
		// show history chat item if shift+downarrow
		$(this).keyup(function(event){
			if (event.which == 40) {
				if (this.shiftdown && (this.logIndex > 0)) {
					this.logIndex--;
					$(this).val(this.chatlog[this.logIndex]);
				}
			}
		});
		
		// reset chat history cursor on focusout
		$(this).focusout(function(event){
			this.logIndex = 0;
		});
		
		//default message focus
		$(this).focusin(function(event){
			if($(this).val() == "enter message") {
				$(this).val("");
			}
		});
		
		$(this).focusout(function(event){
			if($(this).val() != "enter message") {
				$(this).val("enter message");
			}
		});
		
	});
	
	/////////////////////////
	// Chat Settings Bindings
	/////////////////////////
	$('.chatSettings').click(function(){
		alert("TODO: this will open chat settings");
	});
	
	////////////////////
	// Disable Selection
	////////////////////	
	$(".tabs").livequery(function(e){
		$(this).disableSelection();
	});
	
	
};


/*
 * API
 */

MEUI.ChatBox.prototype = {
		
	constructor: MEUI.ChatBox,
	
	log: function() {
		console.log(this);
	},
	
	loopback: function(msg) {	
		var context = $(".messages");
		msgChan = $(".chatChannel").val();
		outmsg = '<p><span class="channelLoopback">['+ msgChan +']</span><b> Self:</b> ' + msg + '</p>';
		$(context).append(outmsg);
		$(context).animate({ scrollTop: $(context).prop("scrollHeight") - $(context).height() }, 100);
		$('.tabWrapper').fadeTo(250, .5).fadeTo(500, 0);		
	},
	
	local: function(msg) {
		context = $(".messages");
		msgChan = $(".chatChannel").val();
		outmsg = '<p><span class="channelLoopback">['+ msgChan +']</span><b> Self:</b> ' + msg + '</p>';
		$(context).append(outmsg);
		$(context).animate({ scrollTop: $(context).prop("scrollHeight") - $(context).height() }, 100);
		$('.tabWrapper').fadeTo(250, .5).fadeTo(500, 0);		
	},
	
	global: function(msg) {
		context = $(".messages");
		msgChan = $(".chatChannel").val();
		outmsg = '<p><span class="channelLoopback">['+ msgChan +']</span><b> Self:</b> ' + msg + '</p>';
		$(context).append(outmsg);
		$(context).animate({ scrollTop: $(context).prop("scrollHeight") - $(context).height() }, 100);
		$('.tabWrapper').fadeTo(250, .5).fadeTo(500, 0);		
	},
	
	printMessage: function() {
		// todo
	},
	
	command: function() {
		// todo
	},
	
	broadcast: function() {
		$.get('akjsdakjda', data, function(cdata) {
			// format data first???
			console.log(cdata); // status			
		})
	},
	
	
	
	
};

/*
 * ASSETS
 */

//ME3D.Preloader.add('url/to-asset.json', 'uniqueHandle');