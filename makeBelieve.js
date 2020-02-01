

(function (globalObj) {
    "use strict"

    function MakeBelieveElement(nodes) {

        this.nodes = nodes;
	}

	MakeBelieveElement.prototype.parent = function(selector) {
		if(selector === undefined) {
			// console.log(this.nodes[0].parentNode);
			var parentElement = this.nodes[0].parentNode;
			// return this.node;
			return new MakeBelieveElement(parentElement);
		}
	};
		// // }
		// // else {
		// // 	var parent = document.querySelectorAll(selector)[0];
		// // 	console.log(parent);
		// // }
		// var isParent = document.querySelectorAll(cssSelector)[0];
        // // console.log(isParent);
        // var parentList = [];
        // var childElement = this.nodes[0];
        // while(childElement) {
        //     childElement = childElement.parentNode;
        //     if(childElement !== null) {
        //         parentList.push(childElement);
        //         if(childElement === isParent) {
        //             break;
        //         };
        //     };
            
        // };
        // return parentList;

		
		
		//7. Implement a click handler which handles if an element is being clicked.
		MakeBelieveElement.prototype.onClick = function (event) {
			for (let i = 0; i < this.nodes.length; i++) {
				this.nodes[i].addEventListener('click', event);
			}
			return this;
		}
		
	function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    }

	globalObj.__ = query;
	
})(window);

//skilar form
var parent = __('.password').parent().parent();
//skilar div(four)
var parentForm = __('form').parent();
console.log(parentForm);
console.log(parent);

// onClick() checker
__('.clickHandler').onClick(function(event) {
	console.log(event.target);
});