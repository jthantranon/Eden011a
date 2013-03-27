/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Manages updates to state of avatars in vacinity to client.
 */

// TODO: default parameters and arguments

ME3D.Population = function (scene,picker) {
	
	var self = this;
	
	this.avatarList = [];
	this.refreshList = [];
	this.census = [];
	this.scene = scene;
	this.picker = picker;
	
	this.getData = function() {
		MEUI.Wish('fAllPixelIDs', 'loc', function(d){
			self.refresh(d);
		});
	};
	
	//alert(self.picker);
	
	var popUpdate = window.setInterval(self.getData,1000)

};

ME3D.Population.prototype = {
	constructor: ME3D.Population,
	
	add: function(entity) {
		return this.avatarList.push(entity)
	},
	
	empty: function() {
		this.avatarList = [];
	},
	
	count: function() {
		return this.avatarList.length;
	},
	
	get: function(index) {
		if(index > -1 && index < this.avatarList.length ) {
			return this.observerList[index];
		}
	},
	
	insert: function(entiry,index) {
		var pointed = -1;
		
		if(index === 0) {
			this.avatarList.unshift(entity);
			pointer = index;
		} else if(index === this.avatarList.length) {
			this.avatarList.push(entity);
			pointer = index;
		}
		
		return pointer;
	},
	
	indexOf: function(entity,startIndex) {
		var i = startIndex, pointer = -1;
		
		while(i < this.avatarList.length) {
			if(this.avatarList[i] === entity) {
				pointer = i;
			}
			i++;
		}
		
		return pointer;
	},
	
	removeAt: function(index) {
		if(index === 0) {
			this.avatarList.shift();
		} else if(index === this.avatarList.length -1) {
			this.avatarList.pop();
		}
	},
	
	refresh: function(data) {
		var self = this;
		
		
		
		for(var i=0,j=data.length; i<j; i++){
			
			// take an item from the loc list, now check to see
			// if the origin property is in the census
			
			var searchTerm = data[i].origin;
			var isPresent = false;
			
			// loop through census looking for matching origin
			for(var k=0,l=self.census.length; k<l && isPresent == false; k++){
				if (self.census[k].origin == searchTerm) {
					// it exists
					isPresent = true;
				};
			};
			
			if(isPresent) {
				//alert('present');
				// update the location
				var avatar = self.scene.getChildByName(data[i].origin);
				var location = new THREE.Vector3(data[i].xloc,.5,data[i].zloc);
				// var heading = data[i].heading;
				// var velocity = data[i].velocity;
				avatar.updateLoc(location);
				
			} else {
				// alert('not Present');
				// make a new avatar
				var updatedLoc = new THREE.Vector3(data[i].xloc,.5,data[i].zloc);
				var newAvatar = new ME3D.Avatar({name:searchTerm, location:updatedLoc});
				console.log(self.picker);
				self.picker.addClick(newAvatar);
				self.scene.add(newAvatar);
				
				// and push the entry to censsdus
				self.census.push(data[i]);
			}
			
			
			// in the future check for missing list and destroy them
			// search through census
				// if not found in data, delete from census
				
				
			// alert(searchTerm);
			//var searchIndex = 
			
			
		};
	}
	
};

