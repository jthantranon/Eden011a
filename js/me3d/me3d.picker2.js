/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.4
 * Makes buildings!!
 */

ME3D.Picker = function (scene, camera) {
	
	var self = this;
	
	this.clickList = [];
	this.intersectList = [];
	
	var camera = camera;
	var scene = scene;
	
	var mouse = { x: 0, y: 0 }, INTERSECTED, INTERSECTEDBUILDING;
	
	var isClicked=false;
	
	var projector = new THREE.Projector();
	
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	
	document.onmousedown = function(e) {
		isClicked=true;	
	}
	
	document.onmouseup = function(e) {
		isClicked=false;
	}
	
	
	
	function onDocumentMouseMove( event ) {
	
		event.preventDefault();
	
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	}
	
	this.resolve = function() {
		
		
		//console.log(isClicked);
		
		var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
		projector.unprojectVector( vector, camera );
	
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	
		var scenegroups = [];
				
		for(var i=0,j=self.intersectList.length;i<j;i++) {
			
			scenegroups.push(self.intersectList[i]);
			 
			var children = self.intersectList[i].getDescendants();
			
			for(var k=0,l=children.length;k<l;k++) {
				if(self.intersectList[i].hasOwnProperty('resolveClick')) {
					if(!children[k].hasOwnProperty('resolveClick')) {
						children[k].childClick = 1;
						children[k].doClick = self.intersectList[i].doClick;
					}
				}
				
				if(self.intersectList[i].hasOwnProperty('resolveHover')) {
					if(!children[k].hasOwnProperty('resolveHover')) {
						children[k].childHover = 1;
						children[k].doMouseEnter = self.intersectList[i].doMouseEnter;
						children[k].doMouseLeave = self.intersectList[i].doMouseLeave;
					}
				}  
				
				scenegroups.push(children[k]);
			}
		
		}
				
		var intersects = raycaster.intersectObjects( scenegroups );
		
		if ( intersects.length > 0 ) {
			
			// if its not the same, clear the old one and update the new one		
			if ( INTERSECTED != intersects[ 0 ].object ) {
				if ( INTERSECTED ) INTERSECTED.material.opacity = .25;
		
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.material.opacity = .75;
				if(INTERSECTED.hasOwnProperty('resolveHover')) INTERSECTED.doMouseEnter();
				if(INTERSECTED.hasOwnProperty('childHover')) INTERSECTED.parent.doMouseEnter();	
				
				
				if(isClicked) { 
					//console.debug(INTERSECTED.data.coords);
					//ME3D.Ticker.triggerClick(INTERSECTED.parent);
					console.log(INTERSECTED);
					if(INTERSECTED.hasOwnProperty('resolveClick')) INTERSECTED.doClick();
					if(INTERSECTED.hasOwnProperty('childClick')) INTERSECTED.parent.doClick();					
					
				}
				isClicked=false;
			// its the same or a new item
			} else { 
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.material.opacity = .75;
				if(INTERSECTED.hasOwnProperty('resolveHover')) INTERSECTED.doMouseEnter();
				if(INTERSECTED.hasOwnProperty('childHover')) INTERSECTED.parent.doMouseEnter();	
				
				//ME3D.Ticker.triggerHover(INTERSECTED.parent);
				
				if(isClicked) { 
					//console.debug(INTERSECTED.data.coords);
					//ME3D.Ticker.triggerClick(INTERSECTED.parent);
					console.log(INTERSECTED);
					if(INTERSECTED.hasOwnProperty('resolveClick')) INTERSECTED.doClick();
					if(INTERSECTED.hasOwnProperty('childClick')) INTERSECTED.parent.doClick();		
				}
				isClicked=false;
			}
		// nothing selected so set the currently lit one to normal
		} else {
		
			if ( INTERSECTED ) {
				INTERSECTED.material.opacity = .25;
				if(INTERSECTED.hasOwnProperty('resolveHover')) INTERSECTED.doMouseLeave();
				if(INTERSECTED.hasOwnProperty('childHover')) INTERSECTED.parent.doMouseLeave();
			}	
		
			INTERSECTED = null;
		
		}
		
	}
	
	
	
	return this;
};

ME3D.Picker.prototype = {
	constructor: ME3D.Picker,
	
	log: function() {
		console.log(this);
	},
	
	addClick: function(entity) {
		entity.resolveClick = 1;
		entity.resolveHover = 1;
		//this.clickList.push(entity);
		this.intersectList.push(entity);
		
		// if this is already in the list
		// don't put it in;
	},
	
	addHover: function(entity) {
		entity.resolveHover = 1;
		//this.clickList.push(entity);
		this.intersectList.push(entity);
		
		// if this is already in the list
		// don't put it in;
	},
	
	removeClick: function(entity) {
		
	},
	
	removeHover: function(entity) {
		
	},
	
}

