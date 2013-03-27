
	$.when(
		//$.getScript( "/_ah/channel/jsapi")
		$.getScript( "https://talkgadget.google.com/talkgadget/channel.js")
	).done(loadVendor);
	//loadVendor();
	
	function loadVendor(){
		console.log('google channel api loaded; now loading vendor scripts;');
		
		$.when(
			$.getScript( "js/vendor/jquery-ui-1.10.2.custom.min.js"),
			$.getScript( "js/vendor/jquery.livequery.js"),
			$.getScript( "js/vendor/jquery.jqote2.min.js"),
			$.getScript( "js/vendor/knockout-2.2.1.js"),
			$.getScript( "js/vendor/stats.min.js"),
			$.getScript( "js/vendor/three.js"),
			$.getScript( "js/vendor/tween.min.js"),
			$.getScript( "js/vendor/sparks.js"),
			$.getScript( "js/vendor/cannon.js")
		).done(loadCore);
		
		return;
	};
	
	function loadCore(){
		
		console.log('vendor scripts loaded; now loading core;');
		
		$.when(
			$.getScript( "js/me3d.js"),
			$.getScript( "js/meui.js"),
			$.getScript( "js/UIControl.js"),			
			$.getScript( "js/meui/meui.channel.js")
		).done(loadBase);	
		
		return;
	};
	
	function loadBase(){
			
		console.log('core loaded; now loading base objects;');
		
		$.when(
			$.getScript( "js/meui/meui.chatbox.js"),
			$.getScript( "js/meui/meui.sheet.js"),
			$.getScript( "js/me3d/me3d.interactions.js"),
			$.getScript( "js/me3d/me3d.entity.js"),
			$.getScript( "js/me3d/me3d.system.js"),
			$.getScript( "js/me3d/me3d.scene.js"),
			$.getScript( "js/me3d/me3d.physics.js"),
			$.getScript( "js/me3d/me3d.population.js"),
			$.getScript( "js/me3d/me3d.emitter.js"),
			$.getScript( "js/me3d/me3d.sparks.js"),
			$.getScript( "js/me3d/me3d.picker.js"),
			$.getScript( "js/me3d/me3d.bounds.js")
		).done(loadExtended);	
				
		return;
	}
	
	function loadExtended(){
		
		console.log('base loaded; now loading extended objects;');
		
		$.when(
			$.getScript( "js/meui/meui.dialog.js"),
			$.getScript( "js/meui/meui.dialogchat.js"),
			$.getScript( "js/meui/meui.dialogpaged.js"),
			$.getScript( "js/meui/meui.glass.js"),
			$.getScript( "js/meui/meui.slideglass.js"),
			$.getScript( "js/meui/meui.logintab.js"),
			$.getScript( "js/meui/meui.tooltip.js"),
			$.getScript( "js/meui/meui.contextmenu.js"),
			$.getScript( "js/meui/meui.testglass.js"),
			$.getScript( "js/me3d/me3d.stage.js"),
			$.getScript( "js/me3d/me3d.grid.js"),
			$.getScript( "js/me3d/me3d.avatar.js"),
			$.getScript( "js/me3d/me3d.testcube.js"),
			$.getScript( "js/me3d/me3d.avatarmover.js"),
			$.getScript( "js/me3d/me3d.builder.js"),
			$.getScript( "js/me3d/me3d.controls.js"),
			$.getScript( "js/me3d/me3d.transitions.js"),
			$.getScript( "js/me3d/me3d.render.js"),
			$.getScript( "js/me3d/me3d.world.js")
		).done(loadMain);			
		
		return;				
	}
	
	function loadMain(){
		
		console.log('all scripts loaded; now loading main;');
		
		$.when(
			$.getScript( "js/main.js")
		).done(function(){
			// main();
		});	
		
		return;
	};
	

	
	// .done(function () { console.log("Everything loaded successfully"); })
	// .fail(function () { console.log("one of the steps failed"); })
	// .always(function () { console.log("Load Process Complete"); });
	
	
	


