var formLength = 0;
var doneText = "Done items:\n";
var items = [];
var getlocal = function(){
	if(localStorage.length>0 && localStorage.items.length>0){
		return JSON.parse(localStorage.items);
	}else{
		localStorage.items = [];
		return [];
	}
}
var updateLocal = function(myArr){
	localStorage.items = JSON.stringify(myArr);
}
function loadItems(){
	if (localStorage.length>0 && localStorage.items.length>0){
	//need to clear div and start again
		$($("#tasks")[0]).empty();
		itemArr = JSON.parse(localStorage.items);
		itemArr.sort(function(a,b){return a.priority- b.priority});
		//array looks like [{"priority":1,"label":"do the washing","value":"true"},{},{}]
		for(var i=0;i<itemArr.length;i++){
			//var index = findIndex(itemArr[i].label);
			//var priority = items[index].priority;
			middleItems(itemArr[i].label,i,itemArr[i].value);
		}
		//clearsbox
		document.getElementById("form1").value="";
	}
}

function submitInfo(){
			//identifys text in submit box and adds to local storage
	var formContents = document.getElementById("form1").value;
	var priority=0
	if(localStorage.length>0){
		priority = getlocal().length;
	}
	var info ={priority: priority,
			label:formContents,
			value:"false"};
	//localStorage.priority = {}

	items = getlocal();
	items.push(info);
			//local storage only supports string so convert..
			//..Array and JSON to string		
	localStorage.items = JSON.stringify(items);	
	loadItems();
}
function findIndex(name){
	items = getlocal();
	for (var i=0; i<items.length;i++){
		if (items[i].label==name){
			return i;
		}
	}
}
function findname(){
	//needs to find property name of item with specific priority
}
/*function addToListNew(){

	for (var i=0;i<localStorage.length;i++){
				middleitems(localStorage[i].label,i);
			}
}*/





function middleItems (divLabel,divID,divValue){
	this.divLabel = divLabel;
	this.divID = divID;
	this.divValue = divValue;
	var itemDiv = document.createElement('div');
	itemDiv.id = "ItemID_" + divID;
	//arrowdown
	var arrowD = document.createElement("img");
	arrowD.src = "images/down-arrow.png";
	arrowD.style.height = '8px';
    arrowD.style.width = '8px';
    arrowD.onclick = movedown;
	itemDiv.appendChild(arrowD);

	//arrow up
	var arrowU = document.createElement("img");
	arrowU.src = "images/up-arrow.png";
	arrowU.style.height = '8px';
	arrowU.style.width = '8px';
	arrowU.onclick = moveup;
	itemDiv.appendChild(arrowU);
	//tickbox
	var inputTick = document.createElement('input');
	inputTick.type = "checkbox";
	inputTick.className = "css-checkbox";
	//below needs work to define ID value
	inputTick.id = "tickbox" + divID;
	inputTick.onclick = update;
	itemDiv.appendChild(inputTick);

	//label
	var itemText = document.createElement ('label');
	itemText.htmlFor = inputTick.id;
	itemText.innerText = divLabel;
	itemText.className = "css-label";
	//adding label to item
	itemDiv.appendChild(itemText);
	if (divValue=="true"){inputTick.checked = true}
	var taskDiv = document.getElementById("tasks");

	taskDiv.appendChild(itemDiv);

}

function update(){
	//need to regenerate all the priorities maybe rebuild the list
	console.log("change made");
	var itemname = this.parentNode.childNodes[3].innerHTML;
	for (var i =0;i<itemArr.length;i++){
	   	if(itemArr[i].label == itemname){
		    itemArr[i].value = this.checked;
		    itemArr[i].priority = i;
   		}
	}
}


function clearDone(){
	var doneBox = document.getElementById("done");

	var nodes = document.getElementById("tasks").childNodes;
	for (var i=0;i<nodes.length;i++){
		if($(nodes[i]).find("input")[0].checked == true){
			var labelname= $(nodes[i]).find("label")[0].innerHTML;
			doneText += labelname + "\n";
			nodes[i].remove();
			var localIndex = findIndex(labelname);
			var items = getlocal();
			items.splice(i,1);			
			//update priorities
		}		
	}
	updateLocal(items);
	for (var i =0;i<items.length;i++){
	    	items[i].priority = i;
	}
	updateLocal(items);
	doneBox.innerText = doneText;
}


		function moveup(){
			var currDiv = this.parentNode;
			var referenceDiv= $(currDiv).prev()[0];
			$(currDiv).insertBefore(referenceDiv);
			var name = $(currDiv).find("label")[0].innerHTML;
			var items = getlocal();
			var currPrior = items[findIndex(name)].priority;
			items[findIndex(name)].priority = currPrior - 1;
			items[findIndex(name)-1].priority = currPrior;
			items.sort(function(a,b){return a.priority- b.priority});
			updateLocal(items);
			//need to update priority on reference div also

		}

		function movedown(){
			var currDiv = this.parentNode;
			var referenceDiv= $(currDiv).next()[0];
			$(currDiv).insertAfter(referenceDiv);
			var name = $(currDiv).find("label")[0].innerHTML;
			var items = getlocal();
			var currPrior = items[findIndex(name)].priority;
			items[findIndex(name)].priority = currPrior + 1;
			items[findIndex(name)+1].priority = currPrior;
			items.sort(function(a,b){return a.priority- b.priority});
			updateLocal(items);

		}
		
		function storeOpenTasks(){
			TODO
		}
		function storeDoneTasks(){
			TODO
		}
