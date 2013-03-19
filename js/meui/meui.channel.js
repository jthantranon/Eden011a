/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.1
 * Singleton channel API manager
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!

MEUI.Channel = {
		
	avatarID:'',
	chatlist:[],
	
	init: function(goog) {
		
		console.log('RUNNING CHANNEL INIT');
		
		$.getJSON('/cic/asession', function(session) {
			
			console.log('JSON CALL TO GET TOKEN');
						
			var channel, handler, socket,
				chantoken = session.Chan,
				id = session.cPixel.kid;
			
	        onOpen = function() {
	        	
	        	console.log('ONOPEN CALLED');	        
	        	console.debug('Session Established...' + chantoken);
	        	MEUI.Channel.broadcastID(id);
	        	
	        	//onMessage();
	        	if(session.pulse.type == 'chat') MEUI.Channel.broadcastChat(session.pulse);
	        	
	        };
			
			onClose = function() { console.debug('Session Closed.'); };
			
			onMessage = function(DATA) {
				console.log('ONMESSAGE CALLED'); 
				alert(DATA.data);
			}
			//onMessage = function(thing) { console.log(thing.pulse); MEUI.Channel.pulseSort(thing.pulse); }
			
			onError = function() { console.debug('Session Error.'); };
			
			openChannel = function() {
				
				console.log('OPEN CHANNEL CALLED');
				
				channel = new goog.appengine.Channel(chantoken);
			    handler = {'onopen': onOpen,'onclose': onClose,'onmessage': onMessage,'onerror': onError};
				socket = channel.open(handler);
				//socket = channel.open();
				socket.onopen = onOpen;
				socket.onmessage = onMessage;
				
				// channel = new goog.appengine.Channel('{{ token }}');
			    // socket = channel.open();
			    // socket.onopen = onOpened;
			    // socket.onmessage = onMessage;
			    // socket.onerror = onError;
			    // socket.onclose = onClose;		
				
			};
			console.log(this)
			setTimeout(openChannel, 10);
			
		});
	},
	
	register: function(item,type) {
		if (type == 'chat') MEUI.Channel.chatlist.push(item);		
	},
	
	broadcastChat: function(pulse) {
		var self = MEUI.Channel;
		for(var i=0,j=MEUI.Channel.chatlist.length;i<j;i++) {
			MEUI.Channel.chatlist[i].inbound(pulse);						
		}
	},
	
	broadcastID: function(id) {
		var self = MEUI.Channel;
		for(var i=0,j=self.chatlist.length;i<j;i++) {
			self.chatlist[i].setID(id);						
		}
	},
	
	pulseSort: function(pulse) {
		console.log(pulse);
		if(pulse.type == 'chat') this.broadcastChat(pulse);
	}
		
};
console.log('ABOUT TO RUN CHANNEL INIT');
MEUI.Channel.init(goog);


