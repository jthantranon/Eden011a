/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Manages updates to state of avatars in vacinity to client.
 */

// TODO: default parameters and arguments

ME3D.Population = function (scene,picker,userAvatar,camera) {
	
	var self = this;
	
	this.avatarList = [];
	this.refreshList = [];
	this.census = [];
	this.scene = scene;
	this.picker = picker;
	this.updateRate = 1000; //default 500
	this.userAvatar = userAvatar;
	this.camera = camera;
	
	this.getData = function() {
		
		
		if(MEUI.Channel.avatarID != '') {
			
			// var locationDat = { 'pixel':{
			// "origin": MEUI.Channel.avatarID,
			// "yloc": self.userAvatar.location.y,
			// "type": "pulseloc",
			// "xloc": self.userAvatar.location.x,
			// "zloc": self.userAvatar.location.z}};
// 			
			var pixelDat = { 
			"origin": MEUI.Channel.avatarID,
			"yloc": self.userAvatar.location.y,
			"type": "censusCheckIn",
			"xloc": self.userAvatar.location.x,
			"zloc": self.userAvatar.location.z,
			"loc": {"x":self.userAvatar.location.x,"y":self.userAvatar.location.y,"z":self.userAvatar.location.z},
			};
			

			MEUI.Wish('censusUpdate', pixelDat, function(data){
				console.debug(JSON.stringify(data)); //strting showing an array of objects
				console.debug(JSON.parse(JSON.stringify(data))); //an array of objects
				//alert(JSON.stringify(data));
				self.refresh(data); //gives error
				// self.refresh(JSON.parse(JSON.stringify(data))) // Uncaught TypeError: Object [object Array] has no method 'IndexOf'
			});
			
			// $.get('locations/update', locationDat, function(d){
				// self.refresh(d);
			// });
			
		}
		
	};
	
		
	//alert(self.picker);
	
	var popUpdate = window.setInterval(self.getData,self.updateRate);
	

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
		
		for(var pixel in data){
            // alert(pixel);
            // alert(JSON.stringify(data[pixel].loc));
            // alert(JSON.stringify(data[pixel].loc.x));
            
            var searchTerm = data[pixel].name;
            var isPresent = false;
            
            // loop through census looking for matching origin
			for(var i=0,j=self.census.length; i<j && isPresent == false; i++){
				if (self.census[i].name == searchTerm) {
					// it exists
					isPresent = true;
				};
			};
			
			
			if(isPresent) {
				//alert('present');
				// update the location
				var avatar = self.scene.getChildByName(data[pixel].name);
				var oldLocation = avatar.location;
				
				var location = new THREE.Vector3(data[pixel].loc.x,data[pixel].loc.y,data[pixel].loc.z);
				// var heading = data[i].heading;
				// var velocity = data[i].velocity;
				
				var predictedX = (avatar.location.x - location.x) + avatar.location.x;
				var predictedY = (avatar.location.y - location.y) + avatar.location.y;
				var predictedZ = (avatar.location.z - location.z) + avatar.location.z;
				
				
				var predicted = { x: predictedX, y: predictedY, z: predictedZ };				
				
				avatar.updateLoc(location,predicted);
				
			} else {
				// alert('not Present');
				// make a new avatar
				var updatedLoc = new THREE.Vector3(data[pixel].loc.x,data[pixel].loc.y,data[pixel].loc.z);
				var newAvatar = new ME3D.Avatar({name:searchTerm, location:updatedLoc, camera:self.camera});
				//console.log(self.picker);
				self.picker.addClick(newAvatar);
				self.scene.add(newAvatar);
				
				// and push the entry to censsdus
				self.census.push(data[pixel]);
			}
			
			
			
			
        }
		
		
// 		
		// // data = JSON.parse(data);
		// //console.log(data.length);
		// //alert(JSON.stringify(data));
		// alert(JSON.stringify(data.Pixel32.loc));
		// //alert(data.length);
// 		
		// for(pixel in data){
// 			
			// // take an item from the loc list, now check to see
			// // if the origin property is in the census
// 			
			// alert(JSON.stringify(pixel.loc));
			// var searchTerm = data[i].name;
			// console.log(JSON.stringify(data[i].name));
			// var isPresent = false;
// 			
			// // loop through census looking for matching origin
			// for(var k=0,l=self.census.length; k<l && isPresent == false; k++){
				// if (self.census[k].name == searchTerm) {
					// // it exists
					// isPresent = true;
				// };
			// };
// 			
			// if(isPresent) {
				// //alert('present');
				// // update the location
				// var avatar = self.scene.getChildByName(data[i].name);
				// var oldLocation = avatar.location;
// 				
				// var location = new THREE.Vector3(data[i].xloc,data[i].yloc,data[i].zloc);
				// // var heading = data[i].heading;
				// // var velocity = data[i].velocity;
// 				
				// var predictedX = (avatar.location.x - location.x) + avatar.location.x;
				// var predictedY = (avatar.location.y - location.y) + avatar.location.y;
				// var predictedZ = (avatar.location.z - location.z) + avatar.location.z;
// 				
// 				
				// var predicted = { x: predictedX, y: predictedY, z: predictedZ };				
// 				
				// avatar.updateLoc(location,predicted);
// 				
			// } else {
				// // alert('not Present');
				// // make a new avatar
				// var updatedLoc = new THREE.Vector3(data[i].xloc,data[i].yloc,data[i].zloc);
				// var newAvatar = new ME3D.Avatar({name:searchTerm, location:updatedLoc, camera:self.camera});
				// //console.log(self.picker);
				// self.picker.addClick(newAvatar);
				// self.scene.add(newAvatar);
// 				
				// // and push the entry to censsdus
				// self.census.push(data[i]);
			// }
			
			
			// in the future check for missing list and destroy them
			// search through census
				// if not found in data, delete from census
				
				
			// alert(searchTerm);
			//var searchIndex = 
			
			
		// };
	}
	
};

