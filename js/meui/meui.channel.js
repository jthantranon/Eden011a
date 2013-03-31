/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.0.1
 * Singleton channel API manager
 */

// TODO: Y UR BINDINGS SO VERBOSE???!?!?!?!


MEUI.Channel = {
	
	chantoken:'',
	avatarID:'',
	chatlist:[],
	chatCtx:'',
	
	init: function(goog,data) {
		
		//alert(data.cPixel.kid);
				
		//this.chantoken = data.cPixel.xID;
		//alert(JSON.stringify(data));
		//this.avatarID = data.cPixel.kid;
		
		onOpened = function() {
			//alert('opened')
			MEUI.Channel.avatarID = data.cPixel.kid;			
		}
		
		onMessage = function(pulse) {
			var data = $.parseJSON(pulse.data);
			//alert(JSON.stringify(data));
			MEUI.Channel.broadcastChat(data);
			alert('msg');
		}
		
		onError = function(e) {
			alert(JSON.stringify(e))
		}
		
		onClose = function() {
			alert('Channel Closed');
		}
		
		//alert(JSON.stringify(data))
		channel = new goog.appengine.Channel(data.Chan);
		//alert(JSON.stringify(channel));
	    socket = channel.open();
	    socket.onopen = onOpened;
	    socket.onmessage = onMessage;
	    socket.onerror = onError;
	    socket.onclose = onClose;
		
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
	
};

$.getJSON('/cic/asession', function(data){
	MEUI.Channel.init(goog,data);
	//$('#chat').attr("data-token",data.token);
	//$('#chat').attr("data-mine",data.clientID);
});