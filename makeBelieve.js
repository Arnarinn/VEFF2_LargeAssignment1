

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
	//Insert text into elements and replaces them if there is already text
	MakeBelieveElement.prototype.insertText = function(text){
		this.nodes[0].innerHTML = text;
	}
	//adds a html element to the end of another element
	MakeBelieveElement.prototype.append = function(html){
		if(typeof html == 'string'){
			this.nodes[0].insertAdjacentHTML('beforeend', html);
		}
		else{
			this.nodes[0].appendChild(html);
		}
	}
	//Add html element to the begining of html element
	MakeBelieveElement.prototype.prepend = function(html){
		if(typeof html == 'string'){
			this.nodes[0].insertAdjacentHTML('afterbegin', html);
		}
		else{
			this.nodes[0].insertBefore(html,this.nodes[0].firstChild);
		}
	}
	//remmoves selected html elements
	MakeBelieveElement.prototype.delete = function(){
		this.nodes.forEach(function(node){
			node.parentNode.removeChild(node);
		});
	}
	//Takes a settings object and makes an http request
	MakeBelieveElement.prototype.ajax = function(httpObj){
		//If there is no url nothing will happen
		if(httpObj.url){
			//If method is emtpy default to GET
			if(!httpObj.method){
				httpObj.method = 'GET';
			}//if timeout is epty, default to 0
			if(!httpObj.timeout){
				httpObj.timeout = 0;
			}//if data is empty, default to {}
			if(!httpObj.data){
				httpObj.data = {};
			}//if headers is empty default to {}
			if (!httpObj.headers) {
				httpObj.headers = {};
			}//if success is undefined, returns null 
			if(!httpObj.success){
				httpObj.success = function(){
					return null;
				}
			}//if fail is undefined, returns null 
			if(!httpObj.fail){
				httpObj.fail = function(){
					return null;
				}
			}//if beforesend is undefined, returns null 
			if(!httpObj.beforeSend){
				httpObj.beforeSend = function(){
					return null;
				}
			}//creates and opens the XMLHttpRequest and sets all the parameters
			var xhr = new XMLHttpRequest();
			xhr.open(httpObj.method, httpObj.url, true);
			for(let i = 0; i < httpObj.headers.length; i++){
				xhr.setRequestHeader(httpObj.headers[i][0],httpObj.headers[i][1]);
			}
			httpObj.beforeSend(xhr);
			xhr.send();
			//onload and status check to check the response
			xhr.onload = function(){
				if (xhr.status != 200){
					httpObj.fail(xhr.status);
				}
				else{
					httpObj.success(xhr.response);
				}
			}
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
//var parent = __('.password').parent().parent();
//skilar div(four)
var parentForm = __('form').parent();
console.log(parentForm);
console.log(parent);

// onClick() checker
__('.clickHandler').onClick(function(event) {
	console.log(event.target);
});

//var parentForm = __('form').parent();
//console.log(parentForm);
//console.log(parent);

//__('.blue').insertText("testing");
/*__('.two').append(
	document.createElement('div')
		.appendChild(
			document.createTextNode('I am the test')));*/
//__('.two').append('<div class="test"></div>');
/*__('.two').prepend(
	document.createElement('div')
		.appendChild(
			document.createTextNode('I am the test')));*/
//__('.two').prepend('<h1 class="red"> im blue dabadee dabada</h1>');
//__('.red').delete();

__().ajax({
	url: 	'http://apis.is/currency/m5',
	method: 'get',
	timeout: 10,
	data: {},
	/*headers: [
		['Authorization', 'John']
	],*/
	success: function(resp){
		console.log("YAY SUCCESS");
		console.log(resp);
	},
	fail: function(error){
		console.log("OH NO AN ERROR");
		console.log(error);
	},
	beforeSend: function(xhr){
		console.log("CALM BEFORE THE STORM");
	}
});
