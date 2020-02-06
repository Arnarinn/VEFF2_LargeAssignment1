

(function (globalObj) {
    "use strict"

    function MakeBelieveElement(nodes) {
        this.nodes = nodes;
	}

	// returns a list of parent elements in a MBE
	MakeBelieveElement.prototype.parent = function(selector) {
		var parentList = [];
		if(selector === undefined) {
			for(var i = 0; i < this.nodes.length; i++) {
				parentList.push(this.nodes[i].parentNode);
			}
		}
		else {
			var chkSelector = document.querySelectorAll(selector);
			for(var i = 0; i < this.nodes.length; i++) {
				for(var j = 0; j < chkSelector.length; j++) {
					if(chkSelector[j] === this.nodes[i].parentNode) {
						parentList.push(this.nodes[i].parentNode);
					}
				}
			}
		}
		return new MakeBelieveElement(parentList);
	};

	// finds the grandparent of the current element. Returns a MBE with a list of grandParents
	MakeBelieveElement.prototype.grandParent = function(selector) {
		var grandParentList = [];
		if(selector === undefined) {
			for(var i = 0; i < this.nodes.length; i++) {
				grandParentList.push((this.nodes[i].parentNode).parentNode);
			}
			return new MakeBelieveElement(grandParentList);
		}
		else {
			var chkSelector = document.querySelectorAll(selector);
			for(var i = 0; i < this.nodes.length; i++) {
				for(var j = 0; j < chkSelector.length; j++) {
					if(chkSelector[j] === (this.nodes[i].parentNode).parentNode) {
						grandParentList.push((this.nodes[i].parentNode).parentNode);
					}
				}
			}
			return new MakeBelieveElement(grandParentList);
		}
	}

	// 
	MakeBelieveElement.prototype.ancestor = function(selector) {
		var ancestorList = [];
		var chkSelector = document.querySelectorAll(selector);
		for(var i = 0; i < this.nodes.length; i++) {
			for(var j = 0; j < chkSelector.length; j++) {
				var currentElement = this.nodes[i];
				while(currentElement !== null) {
					currentElement = currentElement.parentNode;
					if(chkSelector[j] === currentElement) {
						ancestorList.push(currentElement);
					}
				}
			}
		}
		return new MakeBelieveElement(ancestorList);
	}

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
	MakeBelieveElement.prototype.css = function(type, value){
		this.nodes.forEach(function(node){
			node.setAttribute('style', type + ": " + value);
		})
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
		
		//14. Implement a method called toggleClass() which toggles a css class for an element.
		MakeBelieveElement.prototype.toggleClass = function(toggleAclass) {
			for (let i = 0; i < this.nodes.length; i++) {
				this.nodes[i].classList.toggle(toggleAclass);
			}
			return this;
		}

		//15. Implement a submit handler for forms.
		MakeBelieveElement.prototype.onSubmit = function (event) {
			for (let i = 0; i < this.nodes.length; i++) {
				this.nodes[i].addEventListener('submit', event);
			}
			return this;
		}

		//16. Implement an input handler for input tags.
		MakeBelieveElement.prototype.onInput = function (event) {
			for (let i = 0; i < this.nodes.length; i++) {
				this.nodes[i].addEventListener('change', event);
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

// toggleClass() checker
__('#element-1').toggleClass('blue');
// __('#element-1').toggleClass('red');

// onSubmit() function check
__('#my-form').onSubmit(function(event) {
	alert(event.target);
});

// onInput() function check
__('#username').onInput(function(event) {
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
/*
__().ajax({
	url: 	'http://apis.is/currency/m5',
	method: 'get',
	timeout: 10,
	data: {},
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
});*/

__('.blue').css("font-weight", "bold");