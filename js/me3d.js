/**
 * @author @charkova - C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Namespace and global systems, base objects,
 * and utility functions for MetaEden.
 * 
 * namespace() from JavaScript Patterns, Stoyan Stefanov
 * via Addy Osmoni
 * http://addyosmani.com/blog/essential-js-namespacing/
 */


// top-level namespace being assigned an object literal
var ME3D = ME3D || { REVISION: '4',
					 tickList: [],
					 debug:false };


/*
 * a convenience function for parsing string namespaces and
 * automatically generating nested namespaces 
 */

function namespace( ns, ns_string ) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] == "ME3D") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}


/*
 * ME3D.extend
 * a method for extending prototypes from base objects;
 * emulates inheritance; 
 */

ME3D.surrogate = function() {};

ME3D.extend = function (base,sub) {
	// Copy the prototype from the base to setup inheritance
    ME3D.surrogate.prototype = base.prototype;
    // Tricky huh?
    sub.prototype = new ME3D.surrogate();
    // Remember the constructor property was set wrong, let's fix it
    sub.prototype.constructor = sub;
}

/*
 * ME3D.merge
 * used to merge object properties
 * useful for setting default options
 */
ME3D.merge = function(object1, object2) {
	$.extend(object1, object2);	
}


/*
 * ME3D.log
 * optional debug or logging wrapper
 * will log to console if ME3D.debug = true;
 */

ME3D.log = function(args) {
	if(ME3D.debug) {
		console.log(args);
	}
}


/*
 * ME3D.de2ra
 * converts degrees to radians
 */

ME3D.de2ra = function(degree) {
	return degree*(Math.PI/180);
};


/*
 * ME3D.Clock
 * converts degrees to radians
 */

ME3D.Clock = new THREE.Clock();

/*
 * ME3D.Clock
 * converts 3D position to screen coords
 */

ME3D.toScreenXY = function(position, camera, jqdiv) {
	
	if(typeof jqdiv == 'undefined') {
		jqdiv = $('body');
	}
	
	var width = jqdiv.width(), height = jqdiv.height();
	var widthHalf = width / 2, heightHalf = height / 2;
	var position = position, camera = camera;
	
	var projector = new THREE.Projector();
	var vector = projector.projectVector( position, camera );
	
	vector.x = ( vector.x * widthHalf ) + widthHalf;
	vector.y = - ( vector.y * heightHalf ) + heightHalf;
	
    return { x: vector.x, y: vector.y }; 	
};


ME3D.Ticker = {
	
	list: [],
	
	add: function(item) {
		this.list.push(item);
	},
	
	run: function() {
		var delta = ME3D.Clock.getDelta();
		for(var i=0,j=ME3D.Ticker.list.length;i<j;i++) {
			ME3D.Ticker.list[i].tick(delta);
		}
	},
	
	triggerClick: function(entity) {
		console.log(this.list);
		console.log(entity);
		for(var i=0,j=ME3D.Ticker.list.length;i<j;i++) {
			if(ME3D.Ticker.list[i] == entity) {
				ME3D.Ticker.list[i].click();				
			}			
		}
	},
	
	triggerMouseIn: function(entity) {
		console.log(this.list);
		console.log(entity);
		for(var i=0,j=ME3D.Ticker.list.length;i<j;i++) {
			if(ME3D.Ticker.list[i] == entity) {
				ME3D.Ticker.list[i].mouseIn();				
			}			
		}
	},
	
	triggerMouseOut: function(entity) {
		console.log(this.list);
		console.log(entity);
		for(var i=0,j=ME3D.Ticker.list.length;i<j;i++) {
			if(ME3D.Ticker.list[i] == entity) {
				ME3D.Ticker.list[i].mouseOut();				
			}			
		}
	},
	
	getPickList: function() {
		var pickList = new THREE.Object3D();
		
		for(var i=0,j=ME3D.Ticker.list.length;i<j;i++) {
			pickList.add(ME3D.Ticker.list[i]);
		}
		return pickList;
	}
}

ME3D.registerTick = function(entity) {
	ME3D.Ticker.add(entity);
};


ME3D.Preloader = {
	
	onLoadComplete:{},

	loadList:[], assets:{},
	
	listTotal:0, listLoaded:0, loadAttempts:0,
	
	jLoader: new THREE.JSONLoader(),
	tLoader: new THREE.TextureLoader(),
	sLoader: new THREE.SceneLoader(),
	
	textureLoc:'textures',
	
	log: function() {
		ME3D.log(this);		
	},
	
	add: function(url, handle) {
		
		var scope = this;
				
		if(typeof url === 'undefined' || typeof handle === 'undefined') {
			console.log('ME3D.Preloader: Error | Add - undefined arguments');
			return false;
		}
		
		for(var i=0,j=scope.loadList.length; i<j; i++){
		  if(!scope.loadList[i][1].indexOf(handle)) {
		  	console.log('ME3D.Preloader: Error | Add - handle in use: ' + handle);
		  	console.log(scope.loadList);
		  	console.log(scope.loadList[i][0]);
		  	console.log(scope.loadList[i][1].indexOf(handle));
		  	return false;
		  };
		};
		
		// set up the loader ahead of time
		// it wasn't working in the loop
		var loader = new THREE.JSONLoader();
		
		var loadFunction = function(url,handle) {
			
			loader.load(url, function(geometry, materials) {
				scope.updateLoadProgress(geometry,materials,handle);
			}, scope.textureLoc);
			
		}	
			
		scope.loadList.push([url,handle,loadFunction]);
		scope.listTotal = scope.loadList.length;
		return true;
				
	},
	
	load: function(callback) {
		
		var scope = this;
		
		if(typeof callback !== 'undefined') {
			scope.onLoadComplete = callback;
		}
		
		scope.listTotal = scope.loadList.length;
		scope.loadedTotal = 0;
		scope.loadAttempts = 0;
		
		for(var i=0,j=scope.loadList.length; i<j; i++){
			scope.loadList[i][2](scope.loadList[i][0],scope.loadList[i][1]);
			
		};
					
	},
	
	updateLoadProgress: function(geometry, materials, handle) {
		var scope = this;
		
		scope.assets[handle] = { geometry:geometry, materials:materials};
		scope.loadedTotal++;
		
		if (scope.loadedTotal == scope.listTotal) {
			console.log('preloading finished');
			//console.log(scope.onLoadComplete);
			scope.onLoadComplete();			
		}
		
	},
	
	
	flush: function() {
		this.assets = [];
	},
	
	remove: function(handle) {
		var scope = this, idx;
				
		for(var i=0,j=scope.assets.length; i<j; i++){
			if(scope.loadList[i][1] == handle) {
				scope.loadList = scope.loadList.splice(idx,1);
				return true;
			} 
		};
		
		return false;
	}
		
};

ME3D.LERP = {
	
	lerpList:[],
	clock: new Date(),
	timer: new THREE.Clock(),
	
	tween: function(props) {
		
		var currentTime = new Date();
				
		var endTime = currentTime.getTime() + props.duration*1000;
			
		var difference = -(props.start - props.end);
			
		var changePerSecond =  difference / props.duration;
			 
		ME3D.LERP.lerpList.push(props.item, changePerSecond, endTime);
		
	},
	
	update: function() {
		var delta = ME3D.LERP.timer.getDelta();	
		//console.log(ME3D.LERP.lerpList);	
		for(var i=0,j=ME3D.LERP.lerpList.length; i<j; i++){
			console.log(new Date().getTime());
			if(ME3D.LERP.lerpList[2] > new Date().getTime()) {
				console.log('over');
				ME3D.LERP.remove(ME3D.LERP.lerpList[i]);
			} else {
				console.log('going');
				ME3D.LERP.lerpList[i][0] + ME3D.LERP.lerpList[i][1]*delta;				
			}	
			
		};		
	},
	
	remove: function(observer){
		ME3D.LERP.removeAt( ME3D.LERP.lerpList.IndexOf( observer, 0 ) );		
	},
	
	removeAt: function( index ){
		if( index === 0 ){
			ME3D.LERP.lerpList.shift();
		} else if( index === this.observerList.length -1 ) {
			ME3D.LERP.lerpList.pop();
		} else {
			ME3D.LERP.lerpList.splice(index,1);
		}
	}
	
}
