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
		
		this.chantoken = data.Chan;
		this.avatarID = data.cPixel.xID;
		
		channel = new goog.appengine.Channel(this.chantoken);
	    socket = channel.open();
	    socket.onopen = onOpened;
	    socket.onmessage = onMessage;
	    socket.onerror = onError;
	    socket.onclose = onClose;
		
		function onOpened() {
			//alert('opened biatch')			
		}
		
		function onMessage(pulse) {
			var data = $.parseJSON(pulse.data);
			//alert(JSON.stringify(data));
			MEUI.Channel.broadcastChat(data);
		}
		
		function onError() {
			// $("#content").append('fuck its fukd!');
		}
		
		function onClose() {
			// $("#content").append('stay the fuck out');
		}
		
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

$.getJSON('cic/asession', function(data){
	MEUI.Channel.init(goog,data);
	//$('#chat').attr("data-token",data.token);
	//$('#chat').attr("data-mine",data.clientID);
});
