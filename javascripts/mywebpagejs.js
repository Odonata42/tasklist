		var formLength = 0;
		var doneText = "Done items:\n";
	
		function submitInfo(){
			//identifys text in submit box
			var formContents = document.getElementById("form1").value;
			localStorage[formContents] = false;
			addToList(formContents,false);
		}
		function addToList(task,value){
			//get location of div to place items
			var taskDiv = document.getElementById("tasks");
			var itemDiv = document.createElement('div');
			taskDiv.appendChild(itemDiv);
			//creates tickboxs
			var input = document.createElement('input');
			input.type = "checkbox";
			input.id = "box" + formLength;
			input.className = "css-checkbox";
			//input.checked = value;

			//increments formLength for ID calculation
			
			itemDiv.appendChild(input);
			//doesnt work!!!
			document.getElementById("box"+formLength).addEventListener("change",function(){console.log("hello")});
			formLength += 1;
			//creates tickbox text
			var itemText = document.createElement ('label');
			itemText.htmlFor = input.id;
			itemText.innerText = task;
			itemText.className = "css-label";
			itemDiv.appendChild(itemText);
			if (value=="true"){input.checked = true}
			//clearsbox
			document.getElementById("form1").value="";

		}
		function loadItems(){
			for (x in localStorage){
				addToList(x,localStorage[x]);
			}

		}

		function clearDone(){
			var doneBox = document.getElementById("done");
			
			var items = document.getElementsByClassName("css-label");
			var tickBoxes = document.getElementsByClassName("css-checkbox");
			for (var i=0;i<items.length;i++){
				if(tickBoxes[i].checked==true){
					doneText += items[i].innerHTML + "\n"
					items[i].parentNode.remove();
					i--;
				}
			}
			doneBox.innerText = doneText;

		}
	
		
		function storeOpenTasks(){
			TODO
		}
		function storeDoneTasks(){
			TODO
		}