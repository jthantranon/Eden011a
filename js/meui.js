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




/******************
// sample usage:
// extend myApp with a deeply nested namespace
var mod = extend(myApp, 'myApp.modules.module2');
// the correct object with nested depths is output
console.log(mod);
// minor test to check the instance of mod can also
// be used outside of the myApp namesapce as a clone
// that includes the extensions
console.log(mod == myApp.modules.module2); //true
// further demonstration of easier nested namespace
// assignment using extend
extend(myApp, 'moduleA.moduleB.moduleC.moduleD');
extend(myApp, 'longer.version.looks.like.this');
console.log(myApp);
********************/
