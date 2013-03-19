/**
 * @author Chris
 */

$(document).ready(function(){
	
	var token = '';
	
	$('#chat').attr("disabled", "disabled");
	
	$('#chat').livequery(function(e){		
		$(this).keyup(function(event){
			
			if (event.which == 13) {
				event.preventDefault();
				var context = this;
				sendShit($('#chat').attr("data-mine"),$(this).val());
				$(this).val("");
				
			}
			
		});		
	});
	
	$.getJSON('../chris', function(data){
		makeShit(data.token);
		$('#chat').attr("data-token",data.token);
		$('#chat').attr("data-mine",data.clientID);
	});
	
	function makeShit(token) {
		
		channel = new goog.appengine.Channel(token);
	    socket = channel.open();
	    socket.onopen = onOpened;
	    socket.onmessage = onMessage;
	    socket.onerror = onError;
	    socket.onclose = onClose;
		
		function onOpened() {
			$("#content").append('connected to google and shit<br>');
			$("#chat").removeAttr("disabled");
			
		}
		
		function onMessage(m) {
			var data = $.parseJSON(m.data);
			$("#content").append(data.message + '<br>');
		}
		
		function onError() {
			$("#content").append('fuck its fukd!');
		}
		
		function onClose() {
			$("#content").append('stay the fuck out');
		}
		
	}
	
	function sendShit(token,message) {
		data = {'token':token,'message':message};
		//alert(JSON.stringify(data));
		$.getJSON('../chris/msg',data);
	}
	
	
	
	
		
});




