

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
	MakeBelieveElement.prototype.insertText = function(text){
		this.nodes[0].innerHTML = text;
	}
	MakeBelieveElement.prototype.append = function(html){
		if(typeof html == 'string'){
			this.nodes[0].insertAdjacentHTML('beforeend', html);
		}
		else{
			this.nodes[0].appendChild(html);
		}
		
	}
	MakeBelieveElement.prototype.prepend = function(html){
		if(typeof html == 'string'){
			this.nodes[0].insertAdjacentHTML('afterbegin', html);
		}
		else{
			this.nodes[0].insertBefore(html,this.nodes[0].firstChild);
		}
		
	}
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

	function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    }

	globalObj.__ = query;
	
})(window);

//skilar form
//var parent = __('.password').parent().parent();
//skilar div(four)
//var parentForm = __('form').parent();
//console.log(parentForm);
//console.log(parent);

//__('.blue').insertText("testing");
/*__('.two').append(
	document.createElement('div')
		.appendChild(
			document.createTextNode('I am the test')));*/
//__('.two').append('<div class="test"></div>');
__('.two').prepend(
	document.createElement('div')
		.appendChild(
			document.createTextNode('I am the test')));
__('.two').prepend('<div class="test"></div>');