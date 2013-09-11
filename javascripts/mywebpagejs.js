		var formLength = 0;
		var doneText = "Done items:\n";
		var itemArrStore = [];
		if(localStorage.itemArr){
			itemArrStore = localStorage.itemArr.split(",");
		}
		function submitInfo(){
			//get location of div to place items
			var taskDiv = document.getElementById("tasks");
			//identifys text in submit box
			var formContents = document.getElementById("form1").value;
			//create Div for each item
			var itemDiv = document.createElement('div');
			taskDiv.appendChild(itemDiv);
			//creates tickboxs
			var input = document.createElement('input');
			input.type = "checkbox";
			input.id = "box" + formLength;
			input.className = "css-checkbox";
			//increments formLength for ID calculation
			formLength += 1;
			itemDiv.appendChild(input);
			//creates tickbox text
			var itemText = document.createElement ('label');
			itemText.htmlFor = input.id;
			itemText.innerText = formContents;
			itemText.className = "css-label";
			itemDiv.appendChild(itemText); 
			//clearsbox
			document.getElementById("form1").value="";
			itemArrStore.push(formContents);
			localStorage.itemArr = itemArrStore;
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