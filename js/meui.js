/**
 * @author @charkova - C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Namespace and global systems, base objects,
 * and utility functions for MetaEden UI.
 * 
 * extend() from JavaScript Patterns, Stoyan Stefanov
 * via Addy Osmoni
 * http://addyosmani.com/blog/essential-js-namespacing/
 */

// top-level namespace being assigned an object literal
var MEUI = MEUI || { REVISION: '1' };

/*
 * a convenience function for parsing string namespaces and
 * automatically generating nested namespaces 
 */

function namespace( ns, ns_string ) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] == "MEUI") {
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
 * MEUI.extend
 * a method for extending prototypes from base objects;
 * emulates inheritance; 
 */

MEUI.surrogate = function() {};

MEUI.extend = function (base,sub) {
	// Copy the prototype from the base to setup inheritance
    ME3D.surrogate.prototype = base.prototype;
    // Tricky huh?
    sub.prototype = new ME3D.surrogate();
    // Remember the constructor property was set wrong, let's fix it
    sub.prototype.constructor = sub;
}

/*
 * MEUI.merge
 * used to merge object properties
 * useful for setting default options
 */
MEUI.merge = function(object1, object2) {
	$.extend(object1, object2);	
}

MEUI.Capfirst = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//MEUI.grant; // pre-initialized for JSONWish

MEUI.JSONWish = function(name,args,cbFunc) {
	
	var wish = { name:name, wishargs:args };
			
//	var wish = (function (name,args) {
//		
//		var wish = {};
//		wish.name = name;
//		wish.wishargs = args;
//		
//		return wish;
//		
//	})(name,args);
	
	console.debug({ wish: JSON.stringify(wish)});
	
	$.getJSON('/cic/wishingwell', { wish: JSON.stringify(wish)},function(grant) {
		console.debug(grant);
	}).done(cbFunc);
	
};

MEUI.Wish = MEUI.JSONWish;
// usage:
// MEUI.Wish(name,args,cbFunc);
