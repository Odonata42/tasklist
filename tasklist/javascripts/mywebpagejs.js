//TODO breaks when delete all items from list - localstorage.items = undefined

$(function(){
	console.log("this doesnt work!");
	loadItems();
	$(".submitbtn").click(submitInfo);
	$(".cleardone").click(clearDone);
});

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

function submitInfo(){
	//identifys text in submit box and adds to local storage + regenerates list
	var formContents = document.getElementById("form1").value;
	var priority=0;

	var info ={
			priority: priority,
			label:formContents,
		};
	var items = getlocal();
	items.unshift(info);
	//increases all below item priorities by 1
	for (var i=1;i<items.length;i++){
		items[i].priority = items[i].priority +1;
	}	
	localStorage.items = JSON.stringify(items);	
	document.getElementById("form1").value="";
	loadItems();
}


//combine below two functions together??
function loadItems(){
	if (localStorage.length>0 && localStorage.items.length>0){
	//need to clear div and start again
		$($("#tasks")[0]).empty();
		var items = JSON.parse(localStorage.items);
		items.sort(function(a,b){return a.priority- b.priority});
		//array looks like [{"priority":1,"label":"do the washing","value":"true"},{},{}]
		for(var i=0;i<items.length;i++){
			generateList(items[i].label,i,items[i].value);
		}
	}
}
function generateList (divLabel,divID,divValue){
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
	inputTick.className = "customCheckbox";
	//below needs work to define ID value
	inputTick.id = "tickbox" + divID;
	//below is no longer needed - strip out rest of checked=true code
	//inputTick.onclick = update;
	itemDiv.appendChild(inputTick);

	//create label div
	var divText = document.createElement('div');
	divText.innerText = divLabel;
	divText.className = "formatTextVisible"
	divText.onclick = edit;
	//$(divText).click(edit); <-- this is how to do the same as above but in jquery
	itemDiv.appendChild(divText);
	
	//input box shown when editing
	var editInput = document.createElement('input');
	editInput.className = 'editHide';
	itemDiv.appendChild(editInput);

	var taskDiv = document.getElementById("tasks");
	taskDiv.appendChild(itemDiv);

}

/*
No longer need below function - dont care about checked=true/false anymore
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
*/
//combine below three into one function
var updateLocal = function(myArr){
	localStorage.items = JSON.stringify(myArr);
}

function findIndex(name){
	//may still need for cleardone
	items = getlocal();
	for (var i=0; i<items.length;i++){
		if (items[i].label==name){
			return i;
		}
	}
}

function clearDone(){
	//needs to clear from local storage and regenerate? how do we find out which items are checked?
	var doneBox = document.getElementById("done");

	var nodes = document.getElementById("tasks").childNodes;
	for (var i=0;i<nodes.length;i++){
		if($(nodes[i]).find("input")[0].checked == true){
			var labelname= $(nodes[i]).find("div")[0].innerHTML;
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
	//done
	var currDiv = this.parentNode;
	var items = getlocal();
	var currPrior = currDiv.id.match(/[0-9]+/)[0];

	items[currPrior].priority = currPrior - 1;
	items[currPrior-1].priority = parseInt(currPrior);
	items.sort(function(a,b){return a.priority- b.priority});
	updateLocal(items);
	loadItems();
	//need to update priority on reference div also
}

function movedown(){
	//update to rebuild list completely from local storage
	var currDiv = this.parentNode;
	var items = getlocal();
	var currPrior = parseInt(currDiv.id.match(/[0-9]+/)[0]);
	items[currPrior].priority = currPrior + 1;
	items[currPrior+1].priority = parseInt(currPrior);
	items.sort(function(a,b){return a.priority- b.priority});
	updateLocal(items);
	loadItems();

}
		
function edit(btn){
	//OK no refactoring needed
	//this.parent.id
	var currID=this.parentNode.id;
	var currDiv = this.parentNode;
	var text = $("#"+currID +">.formatTextVisible").text();
	$("#"+currID +">.editHide").val(text);
	$("#"+currID +">.editHide").show()
	$("#"+currID +">.formatTextVisible").hide()

	$("#"+currID +">.editHide").focus();
	$("#"+currID +">.editHide").focusout(function(){
		var inputText = this.value;
		$("#"+currID +">.formatTextVisible").text(inputText); 
		$("#"+currID +">.formatTextVisible").show();
		$("#"+currID +">.editHide").hide();

	})
	console.log(btn);

}
