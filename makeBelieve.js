
var __ = (function(){
	'use strict';
	var Constructor = function(cssSelector){
		console.log(cssSelector);
		this.elems = document.querySelectorAll(cssSelector);
	}
	Constructor.prototype.parent = function(){
		console.log("this is empty");
	}
	Constructor.prototype.parent = function(cssSelector){
		this.elems.parentNode;
	}


	return Constructor;
})