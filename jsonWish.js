	var grant; // pre-initialized for JSONWish
	function jsonWish(name,args,cbFunc){
		wish = (function (name,args){
			var wish = {}
			wish.name = name;
			wish.wishargs = args;
			return wish;
		})(name,args);
		
		console.debug(JSON.stringify(wish));
		$.getJSON('/cic/wishingwell',{wish: JSON.stringify(wish)},function(grant){
			console.debug(grant);
		}).done(cbFunc);
	};