//CELL MODE

function cellMode(buttonMode) {
	for (var i = 0; i < inputObj.length; i++) {
		if (buttonMode == "sideButton1"){ //pencil mode
			pencilbutton.setAttribute("class", "buttonTemplate2off");
			notesbutton.setAttribute("class", "buttonTemplate2on");
			if (inputObj[i].value == inputObj[i].defaultValue){ //only for empty cells
				inputObj[i].maxLength = 1;
				inputObj[i].setAttribute("class", "pencil");
			}
		}
		else if (buttonMode == "sideButton2"){ //notes mode
			pencilbutton.setAttribute("class", "buttonTemplate2on");
			notesbutton.setAttribute("class", "buttonTemplate2off");
			if (inputObj[i].value == inputObj[i].defaultValue){ //only for empty cells
				inputObj[i].maxLength = 9;
				inputObj[i].setAttribute("class", "notes");
			}
		}
	}
}

//END CELL MODE
//RESET BUTTON

function reset(){
	var x = confirm("Are you sure you want to reset?");
	if (x == true){

	}
}

//END RESET BUTTON
//SOLVE BUTTON

function solve(){
	var x = confirm("Are you sure you want to solve?");
	if (x == true){
		cellMode("sideButton1");
		enableMessage("Correct!<br>You have won the game!");
		for (var i = 0; i < inputObj.length; i++) {
			inputObj[i].value = solution[i];
		}
	}
}

//END SOLVE BUTTON
//ENABLE MESSAGE

function enableMessage(text){
	document.getElementById("answerMessage").style.display = "block";
	document.getElementById("coorX").style.display = "block";
	document.getElementById("coorY").style.display = "block";			
	document.getElementById("tables").style.width = "429px";
	document.getElementById("tables").style.height = "429px";
	document.getElementById("tables").style.padding = "0px";
	document.getElementById("inputAnswer").innerHTML = text;
}

//END ENABLE MESSAGE
//DISABLE MESSAGE

function disableMessage(){
	document.getElementById("answerMessage").style.display = "none";
	document.getElementById("coorX").style.display = "none";
	document.getElementById("coorY").style.display = "none";
	document.getElementById("tables").style.width = "347px";
	document.getElementById("tables").style.height = "347px";
	document.getElementById("tables").style.padding = "41px";
}

//END DISABLE MESSAGE