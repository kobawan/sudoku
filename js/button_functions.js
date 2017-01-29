//CELL MODE

function cellMode(buttonMode) {
	for (var i = 0; i < inputObj.length; i++) {
		if (buttonMode == "togglepencil"){ //pencil mode
			pencilbutton.setAttribute("class", "buttonTemplate2off");
			notesbutton.setAttribute("class", "buttonTemplate2on");
			if (inputObj[i].value == inputObj[i].defaultValue){ //only for empty cells
				inputObj[i].maxLength = 1;
				inputObj[i].setAttribute("class", "pencil");
			}
		}
		else if (buttonMode == "togglenotes"){ //notes mode
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
		for(var i=0; i<81; i++){
			inputObj[i].value = inputObj[i].defaultValue;
		}
        cellMode("togglepencil");
		beginPuzzle(mask);
	}
}

//END RESET BUTTON
//SOLVE BUTTON

function solve(){
	var x = confirm("Are you sure you want to solve?");
	if (x == true){
		cellMode("togglepencil");
		enableMessage("Correct!<br>You have won the game!");
		for (var i = 0; i < 81; i++) {
			inputObj[i].value = matrix[i];
		}
	}
}

//END SOLVE BUTTON
//IN-GAME FUNCTION

function win(){
    var dup = 0;
    for (var i=0; i<81; i++){
        if(inputObj[i].classList.contains("errorPencil") || inputObj[i].classList.contains("highlightErrorPencil")){
            dup++;
        }
    }
    if(dup == 0 && inputObj.length == 81){
        enableMessage("Correct!<br>You have won the game!");
        return "win";
    }
}

//END IN-GAME FUNCTION
//CHECK BUTTON

function check() {
    var result = win();
    if(result == "win") enableMessage("Correct!<br>You have won the game!");
    else { //Not all cells have values
        var wrongCells = [];
        for (var j = 0; j < pencilRow.length; j++){
            for (var i = 0; i < pencilRow[j].length; i++) {
				/*if (pencilRow[j][i].value != arrSol[j][i]) { //if cell is not same as solution
				 var coorId = document.getElementById(pencilRow[j][i].id);
				 var coorRow = coorId.parentNode.parentNode.rowIndex; // row
				 var coorCol = coorId.parentNode.cellIndex; //column
				 for(var a=0; a<9; a++){
				 var alphabet = "ABCDEFGHI";
				 if (coorCol == a) coorCol = alphabet[a]; //assign letter to column
				 }
				 wrongCells.push("Cell " + coorCol + (coorRow+1) + " should be " + arrSol[j][i]);
				 }*/
            }
        }
        if (wrongCells.length > 0){  //if values are not same as solution so far
            enableMessage("Incorrect!<br>" + wrongCells.join("<br>"));
        }
        else enableMessage("Correct so far!"); //if values are same as solution so far
    }
}

//END CHECK BUTTON
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